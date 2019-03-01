using System;
using System.Windows.Forms;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Text;
using System.IO;

namespace SmartHomeSignalControl
{
    public partial class MainForm : Form
    {
        Socket socketClient;
        string msgRecvd;

        public MainForm()
        {
            InitializeComponent();
        }

        private void socketConn(IPAddress ip, int port)
        {
            IPEndPoint ipep = new IPEndPoint(ip, port);
            socketClient = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            try
            {
                socketClient.Connect(ipep);
                Thread recvThread;
                recvThread = new Thread(MsgRecv);
                recvThread.IsBackground = true;
                recvThread.Start();
                ConnBtn.Text = "断开";
            }
            catch (Exception e)
            {
                return;
            }
        }

        private delegate void MsgDele();

        void MsgRecv()
        {
            while (true)
            {
                try
                {
                    byte[] buffer = new byte[1024 * 1024];
                    int n = socketClient.Receive(buffer);
                    msgRecvd = byteToHexStr(buffer, n);
                    //string msg = Encoding.ASCII.GetString(buffer, 0, n);
                    MsgDele mdl = new MsgDele(MsgToBox);
                    BeginInvoke(mdl);
                }
                catch
                {
                    break;
                }
            }
        }

        private void MsgToBox()
        {
            MsgRecvBox.Items.Add(msgRecvd);
            MsgRecvBox.SelectedIndex = MsgRecvBox.Items.Count - 1;
            MsgRecvBox.SelectedIndex = -1;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            //this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None;
            ConnMethodComboBox.Items.Add("TCP 客户端");
            ConnMethodComboBox.SelectedIndex = 0;
            LoadSavedInfo();
        }

        private void LoadSavedInfo()
        {
            try
            {
                FileStream file = new FileStream("info.sav", FileMode.Open);
                StreamReader sr = new StreamReader(file);
                ipBox.Text = sr.ReadLine();
                portBox.Text = sr.ReadLine();
                while (sr.Peek() >= 0)
                {
                    MsgSentHistoryBox.Items.Add(sr.ReadLine());
                }
                sr.Close();
                file.Close();
            }
            catch
            {

            }
        }

        private void ConnBtn_Click(object sender, EventArgs e)
        {
            if(ConnBtn.Text == "连接")
                socketConn(IPAddress.Parse(ipBox.Text), Convert.ToInt32(portBox.Text));
            else
            {
                socketClient.Close();
                ConnBtn.Text = "连接";
            }
        }

        private void MsgSendBtn_Click(object sender, EventArgs e)
        {
            if(socketClient!=null && sendMsgBox.Text != "")
            {
                try
                {
                    byte[] buffer = HexStrTobyte(sendMsgBox.Text);
                    socketClient.Send(buffer);
                    MsgRecvBox.Items.Add("Sent: " + sendMsgBox.Text);
                    if(MsgSentHistoryBox.FindString(sendMsgBox.Text) == -1)
                    MsgSentHistoryBox.Items.Add(sendMsgBox.Text);
                    sendMsgBox.Text = "";
                    MsgRecvBox.SelectedIndex = MsgRecvBox.Items.Count - 1;
                    MsgRecvBox.SelectedIndex = -1;
                }
                catch
                {
                   
                }
            }
        }

        private static byte[] HexStrTobyte(string hexString)
        {
            hexString = hexString.Replace(" ", "");
            if ((hexString.Length % 2) != 0)
                hexString += " ";
            byte[] returnBytes = new byte[hexString.Length / 2];
            for (int i = 0; i < returnBytes.Length; i++)
                returnBytes[i] = Convert.ToByte(hexString.Substring(i * 2, 2).Trim(), 16);
            return returnBytes;
        }

        public static string byteToHexStr(byte[] bytes, int length)
        {
            string returnStr = "";
            if (bytes != null)
            {
                for (int i = 0; i < length; i++)
                {
                    returnStr += bytes[i].ToString("X2");//ToString("X2") 为C#中的字符串格式控制符
                }
            }
            return returnStr;
        }

        private void MsgSentHistoryBox_DoubleClick(object sender, EventArgs e)
        {
            sendMsgBox.Text = MsgSentHistoryBox.Text;
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            try
            {
                FileStream file = new FileStream("info.sav", FileMode.Create, FileAccess.Write);
                StreamWriter sw = new StreamWriter(file);
                //开始写入
                sw.Write(ipBox.Text + "\n");
                sw.Write(portBox.Text);
                for (int i = 0; i < MsgSentHistoryBox.Items.Count; i++)
                {
                    sw.Write("\n" + MsgSentHistoryBox.Items[i].ToString());
                }
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                file.Close();
            }
            catch
            {

            }
        }

        private void SaveClearBtn_Click(object sender, EventArgs e)
        {
            File.Delete("info.sav");
            ipBox.Clear();
            portBox.Clear();
            MsgRecvBox.Items.Clear();
            MsgSentHistoryBox.Items.Clear();
        }

        private void ClrHisBtn_Click(object sender, EventArgs e)
        {
            MsgSentHistoryBox.Items.Clear();
        }

        private void DelHisBtn_Click(object sender, EventArgs e)
        {
            MsgSentHistoryBox.Items.Remove(MsgSentHistoryBox.Text);
        }
    }
}
