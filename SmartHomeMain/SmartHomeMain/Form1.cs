using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using System.Data.SQLite;
using System.Collections; // Hashtable
using System.Windows.Forms;


namespace SmartHomeMain
{
    public partial class Form1 : Form
    {
        Hashtable rooms = new Hashtable();
        Hashtable devices = new Hashtable();
        Hashtable actions = new Hashtable();
        Hashtable deviceCodes = new Hashtable();
        OleDbConnection dbConn = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0;Data Source=srcDevCod.mdb"); // Connect to mdb
        DataTable dataView = new DataTable();
        OleDbDataAdapter dbAdapter;
        public int LvlNum;
        public string RoomName;
        public string DeviceName;
        public string ActionName;
        public string InputCode;
        public string OutputCode;
        public int AddFormRet;

        static string exePath = System.Environment.CurrentDirectory;

        public Form1()
        {
            InitializeComponent();
        }

        private void init()
        {
            
        }

        private void ShowLvl()
        {
            lvlSelect.Items.Clear();
            lvlSelect.Items.Add("所有楼层");
            lvlSelect.SelectedIndex = 0;
            init();

            foreach (DataRow row in dataView.Rows)
            {
                lvlSelect.Items.Add(row["楼层"]);
            }
            
        }

        private void ShowRoom(int lvlNum)
        {
            if (lvlNum != 0)
            {
                dataGridView.DataSource = new DataTable();

                string sql = "select 楼层,房间 from RoomList where 楼层=" + lvlNum;
                dbAdapter = new OleDbDataAdapter(sql, dbConn);
                dataView.Clear();
                dbAdapter.Fill(dataView);
                dataGridView.DataSource = dataView;



                roomList.Items.Clear();
                deviceList.Items.Clear();
                actionList.Items.Clear();
                
                foreach (DataRow row in dataView.Rows)
                {
                    roomList.Items.Add(row["房间"]);
                }
                
            }
            else
            {
                dataGridView.DataSource = new DataTable();

                string sql = "select 楼层 from LevelList order by 楼层";
                dbAdapter = new OleDbDataAdapter(sql, dbConn);
                dataView.Clear();
                dbAdapter.Fill(dataView);
                dataGridView.DataSource = dataView;
                roomList.Items.Clear();
                deviceList.Items.Clear();
                actionList.Items.Clear();
            }
            
        }

        private void ShowDevice(string roomName)
        {
            dataGridView.DataSource = new DataTable();

            string sql = "select 楼层,房间,设备 from DeviceList where 楼层=" + lvlSelect.SelectedIndex + "and 房间='" + roomName + "'";
            dbAdapter = new OleDbDataAdapter(sql, dbConn);
            dataView.Clear();
            dbAdapter.Fill(dataView);
            dataGridView.DataSource = dataView;

            deviceList.Items.Clear();

            foreach (DataRow row in dataView.Rows)
            {
                deviceList.Items.Add(row["设备"]);
            }
        }

        private void ShowDevCod()
        {
            int lvlNum = lvlSelect.SelectedIndex;
            string roomName = roomList.Text;
            string deviceName = deviceList.Text;

            dataGridView.DataSource = new DataTable();

            string sql = "select 楼层,房间,设备,操作,输入,输出 from DeviceCode where 楼层=" + lvlNum + "and 房间='" + roomName + "' and 设备='" + deviceName + "'";
            dbAdapter = new OleDbDataAdapter(sql, dbConn);
            dataView.Clear();
            dbAdapter.Fill(dataView);
            dataGridView.DataSource = dataView;

            actionList.Items.Clear();
            foreach (DataRow row in dataView.Rows)
            {
                actionList.Items.Add(row["操作"]);
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            dbConn.Open();
            init();
            

            ShowLvl();

            comboBox2.Items.Add("9600");
            comboBox2.SelectedIndex = 0;
            comboBox1.Items.AddRange(System.IO.Ports.SerialPort.GetPortNames()); // Get SerialPort List
            if (comboBox1.Items.Count != 0) // if Ports found select first one by default
                comboBox1.SelectedIndex = 0; // select first one
            else
            {
                comboBox1.Items.Add("无");
                comboBox1.SelectedIndex = 0;
                statusLabel.Text = "未发现可用串口";
            }
        }

        private void serialPort_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            byte[] ReDatas = new byte[serialPort.BytesToRead];
            serialPort.Read(ReDatas, 0, ReDatas.Length);
            textBox1.Text = System.Text.Encoding.ASCII.GetString(ReDatas);
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            serialPort.PortName = comboBox1.Text;
            textBox1.Text = comboBox1.Text; // confirm PortName assign
        }

        private void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            serialPort.BaudRate = Convert.ToInt32(comboBox2.Text);
        }

        private void startPortBtn_Click(object sender, EventArgs e)
        {
            if (startPortBtn.Text == "连接" && comboBox1.Text != "无")
            {
                serialPort.PortName = comboBox1.Text;
                serialPort.BaudRate = Convert.ToInt32(comboBox2.Text); // convert string to int
                serialPort.Open();
                startPortBtn.Text = "断开";
                msgSendBtn.Enabled = true;
            }
            else
            {
                serialPort.Close();
                startPortBtn.Text = "连接";
                msgSendBtn.Enabled = false;
            }
        }

        private void msgSendBtn_Click(object sender, EventArgs e)
        {
            byte[] data = Encoding.ASCII.GetBytes(msgBox.Text);
            string str = Convert.ToBase64String(data);
            serialPort.WriteLine(str);
        }

        public void readFile()
        {
            
        }

        private void readDataBtn_Click(object sender, EventArgs e)
        {
            
        }

        private void roomList_SelectedIndexChanged(object sender, EventArgs e)
        {
            actionList.Items.Clear();
            if (roomList.SelectedIndex >= 0)
                ShowDevice(roomList.Text);
        }

        private void deviceList_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (deviceList.SelectedIndex >= 0)
                ShowDevCod();
        }

        private void actionList_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        private void writeDataBtn_Click(object sender, EventArgs e)
        {
            
        }

        private void roomAddBtn_Click(object sender, EventArgs e)
        {
            AddFormRet = 1;
            int lvlNum = lvlSelect.SelectedIndex;
            if (lvlNum <= 0)
                return;
            AddInfoDialog addForm = new AddInfoDialog();
            addForm.Owner = this;
            addForm.OpCode = 1;
            addForm.StartPosition = FormStartPosition.CenterParent;
            addForm.ShowDialog();
            string roomName = RoomName;

            if(AddFormRet == 0 && lvlNum > 0 && roomList.FindStringExact(roomName) == -1)
            {
                OleDbCommand comm = new OleDbCommand("insert into RoomList (楼层,房间) values (" + lvlNum + ",'" + roomName + "')", dbConn);
                if (comm.ExecuteNonQuery() != 0)
                    statusLabel.Text = "添加房间" + roomName + "至楼层" + lvlNum + "成功";

                ShowRoom(lvlNum);
            }
            else
            {
                statusLabel.Text = "请使用不同名字";
            }
        }

        private void roomDelBtn_Click(object sender, EventArgs e)
        {
            int lvlNum = lvlSelect.SelectedIndex;
            string roomName = roomList.Text;

            OleDbCommand comm = new OleDbCommand("delete from RoomList where 楼层=" + lvlNum + "and 房间='" + roomName+ "'", dbConn);
            if (comm.ExecuteNonQuery() != 0)
                statusLabel.Text = "删除房间" + roomName + "至楼层" + lvlNum + "成功";

            ShowRoom(lvlNum);
        }

        private void lvlSelect_SelectedIndexChanged(object sender, EventArgs e)
        {
            ShowRoom(lvlSelect.SelectedIndex);
        }

        private void levelAddBtn_Click(object sender, EventArgs e)
        {
           
            int levelNum = lvlSelect.Items.Count;
            OleDbCommand comm = new OleDbCommand("insert into LevelList(楼层) values("+ levelNum + ")", dbConn);
            if (comm.ExecuteNonQuery() != 0)
                statusLabel.Text = "添加楼层" + levelNum + "成功";
            
            ShowLvl();
        }

        private void levelDelBtn_Click(object sender, EventArgs e)
        {
            int levelNum = lvlSelect.Items.Count - 1;
            OleDbCommand comm = new OleDbCommand("delete from LevelList where 楼层=" + levelNum, dbConn);
            if (comm.ExecuteNonQuery() != 0)
                statusLabel.Text = "删除楼层" + levelNum + "成功";

            ShowLvl();
        }

        private void deviceAddBtn_Click(object sender, EventArgs e)
        {
            int lvlNum = lvlSelect.SelectedIndex;
            string roomName = roomList.Text;

            AddFormRet = 1;
            if (lvlNum <= 0 || roomList.SelectedIndex == -1)
                return;
            AddInfoDialog addForm = new AddInfoDialog();
            addForm.Owner = this;
            addForm.OpCode = 2;
            addForm.StartPosition = FormStartPosition.CenterParent;
            addForm.ShowDialog();
            string deviceName = DeviceName;

            if (AddFormRet == 0 && lvlNum > 0 && roomList.SelectedIndex >= 0 && deviceList.FindStringExact(deviceName) == -1)
            {
                OleDbCommand comm = new OleDbCommand("insert into DeviceList (楼层,房间,设备) values (" + lvlNum + ",'" + roomName + "','" + deviceName + "')", dbConn);
                if (comm.ExecuteNonQuery() != 0)
                    statusLabel.Text = "添加" + deviceName + "至位于楼层" + lvlNum + "的" + roomName + "成功";

                ShowDevice(roomName);
            }
            else
            {
                statusLabel.Text = "请使用不同名字";
            }
        }

        private void deviceDelBtn_Click(object sender, EventArgs e)
        {
            int lvlNum = lvlSelect.SelectedIndex;
            string roomName = roomList.Text;
            string deviceName = deviceList.Text;

            OleDbCommand comm = new OleDbCommand("delete from DeviceList where 楼层=" + lvlNum + "and 房间='" + roomName + "' and 设备='" + deviceName + "'", dbConn);
            if (comm.ExecuteNonQuery() != 0)
                statusLabel.Text = "删除" + deviceName + "于位于楼层" + lvlNum + "的" + roomName + "成功";

            ShowDevice(roomName);
        }

        private void actionAddBtn_Click(object sender, EventArgs e)
        {
            int lvlNum = lvlSelect.SelectedIndex;
            string roomName = roomList.Text;
            string deviceName = deviceList.Text;
            

            AddFormRet = 1;
            if (lvlNum <= 0 || roomList.SelectedIndex == -1 || deviceList.SelectedIndex == -1)
                return;
            AddInfoDialog addForm = new AddInfoDialog();
            addForm.Owner = this;
            addForm.OpCode = 3;
            addForm.StartPosition = FormStartPosition.CenterParent;
            addForm.ShowDialog();
            string actionName = ActionName;

            if (lvlNum > 0 && roomList.SelectedIndex >= 0 && deviceList.SelectedIndex >=0 && actionList.FindStringExact(actionName) == -1)
            {
                OleDbCommand comm = new OleDbCommand("insert into DeviceCode (楼层,房间,设备,操作,输入,输出) values (" + lvlNum + ",'" + roomName + "','" + deviceName + "','" + actionName + "','" + InputCode + "','" + OutputCode + "')", dbConn);
                if (comm.ExecuteNonQuery() != 0)
                    statusLabel.Text = "添加" + actionName + "至" + deviceName + "成功";

                ShowDevCod();
            }
            else
            {
                statusLabel.Text = "请使用不同名字";
            }
        }

        private void actionDelBtn_Click(object sender, EventArgs e)
        {
            int lvlNum = lvlSelect.SelectedIndex;
            string roomName = roomList.Text;
            string deviceName = deviceList.Text;
            string actionName = actionList.Text;

            OleDbCommand comm = new OleDbCommand("delete from DeviceCode where 楼层=" + lvlNum + "and 房间='" + roomName + "' and 设备='" + deviceName + "' and 操作='" + actionName +"'", dbConn);
            if (comm.ExecuteNonQuery() != 0)
                statusLabel.Text = "删除" + actionName + "成功";

            ShowDevCod();
        }
    }
}
