using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace SmartHomeMain
{
    public partial class AddInfoDialog : Form
    {
        public int OpCode;
        public AddInfoDialog()
        {
            InitializeComponent();
        }

        private void CancelBtn_Click(object sender, EventArgs e)
        {
            Form1 form = (Form1)this.Owner;
            form.AddFormRet = 1;
            this.Close();
        }

        private void ConfirmBtn_Click(object sender, EventArgs e)
        {
            Form1 form = (Form1)this.Owner;
            switch(OpCode)
            {
                case 1:
                    form.RoomName = NameBox.Text;
                    form.AddFormRet = 0;
                    break;
                case 2:
                    form.DeviceName = NameBox.Text;
                    form.AddFormRet = 0;
                    break;
                case 3:
                    form.ActionName = NameBox.Text;
                    form.InputCode = InputBox.Text;
                    form.OutputCode = OutputBox.Text;
                    break;
                default:
                    break;
            }
            this.Close();
        }

        private void AddInfoDialog_Load(object sender, EventArgs e)
        {
            if(OpCode == 3)
            {
                InputBox.Enabled = true;
                OutputBox.Enabled = true;
            }
            else
            {
                InputBox.Enabled = false;
                OutputBox.Enabled = false;
            }
        }
    }
}
