using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SQLite;

namespace DeviceEditor
{
    public partial class Main : Form
    {
        SQLiteConnection dbConnection;
        Dictionary<int, string> typeDict;
        BindingSource typeBS;
        Dictionary<int, string> roomDict;
        BindingSource roomBS;
        List<int> lvlComboSrc;

        public Main()
        {
            InitializeComponent();
        }

        private void Init()
        {
            
        }

        private void InitLists()
        {
            // Init device type list

            typeDict = new Dictionary<int, string>();
            string[] typeArray = new string[] {
                "一般设备（继电器）（默认）",
                "灯",
                "空调",
                "窗帘"
            };

            for(int i=0;i<typeArray.Length;i++)
            {
                typeDict.Add(i, typeArray[i]);
            }

            typeBS = new BindingSource();
            typeBS.DataSource = typeDict;
            typeCombo.DataSource = typeBS;
            typeCombo.ValueMember = "Key";
            typeCombo.DisplayMember = "Value";

            // Init level list
            lvlComboSrc = new List<int>();

            for (int i = 0; i < 4; i++)
            {
                lvlComboSrc.Add(i+1);
            }

            lvlCombo.DataSource = lvlComboSrc;
        }

        private void LoadRoomList()
        {
            roomDict = new Dictionary<int, string>();

            dbConnection.Open();
            SQLiteCommand dbCommand = dbConnection.CreateCommand();

            int lower = Convert.ToInt32(lvlCombo.SelectedItem.ToString()) * 100;
            int upper = lower + 99;

            dbCommand.CommandText = "SELECT * FROM ROOM_TABLE WHERE ID >= " + Convert.ToString(lower) + " AND ID <=" + Convert.ToString(upper);
            SQLiteDataReader dataReader = dbCommand.ExecuteReader();
            if (dataReader.HasRows)
            {
                while (dataReader.Read())
                {
                    roomDict.Add(dataReader.GetInt16(0), dataReader.GetString(1));
                }
            }
            dbConnection.Close();

            roomBS = new BindingSource();
            roomBS.DataSource = roomDict;
            roomList.DataSource = roomBS;
            roomList.ValueMember = "Key";
            roomList.DisplayMember = "Value";
        }

        private void InitDataBase()
        {
            string dbPath = "btncode.db";
            dbConnection = new SQLiteConnection("data source=" + dbPath);
            dbConnection.Open();
            SQLiteDataAdapter actionDBAdapter = new SQLiteDataAdapter("SELECT * FROM BTN_TABLE", dbConnection);
            DataTable actionDT = new DataTable();
            actionDBAdapter.Fill(actionDT);
            actionDataGridView.DataSource = actionDT;

            SQLiteDataAdapter deviceDBAdapter = new SQLiteDataAdapter("SELECT * FROM DEVICE_TABLE", dbConnection);
            DataTable deviceDT = new DataTable();
            deviceDBAdapter.Fill(deviceDT);
            deviceDataGridView.DataSource = deviceDT;
            dbConnection.Close();
        }

        private void Main_Load(object sender, EventArgs e)
        {
            InitDataBase();
            InitLists();
            
        }

        private void lvlCombo_SelectedIndexChanged(object sender, EventArgs e)
        {
            LoadRoomList();
            roomList.SelectedIndex = -1;
        }

        private void roomList_SelectedValueChanged(object sender, EventArgs e)
        {
            idText.Text = Convert.ToString(roomList.SelectedValue);
            if(autogenCheck.Checked && roomList.SelectedIndex > -1)
                nameText.Text = Convert.ToString(lvlCombo.SelectedItem.ToString()) + "层" + roomList.GetItemText(roomList.SelectedItem);
        }
    }
}
