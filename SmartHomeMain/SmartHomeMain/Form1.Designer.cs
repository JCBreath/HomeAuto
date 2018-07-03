namespace SmartHomeMain
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.serialPort = new System.IO.Ports.SerialPort(this.components);
            this.label2 = new System.Windows.Forms.Label();
            this.comboBox2 = new System.Windows.Forms.ComboBox();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.roomList = new System.Windows.Forms.ListBox();
            this.deviceList = new System.Windows.Forms.ListBox();
            this.statusLabel = new System.Windows.Forms.Label();
            this.actionList = new System.Windows.Forms.ListBox();
            this.startPortBtn = new System.Windows.Forms.Button();
            this.msgBox = new System.Windows.Forms.TextBox();
            this.msgSendBtn = new System.Windows.Forms.Button();
            this.readDataBtn = new System.Windows.Forms.Button();
            this.codeBox = new System.Windows.Forms.TextBox();
            this.writeDataBtn = new System.Windows.Forms.Button();
            this.roomAddBtn = new System.Windows.Forms.Button();
            this.roomDelBtn = new System.Windows.Forms.Button();
            this.dataGridView = new System.Windows.Forms.DataGridView();
            this.lvlSelect = new System.Windows.Forms.ComboBox();
            this.levelAddBtn = new System.Windows.Forms.Button();
            this.levelDelBtn = new System.Windows.Forms.Button();
            this.roomListLabel = new System.Windows.Forms.Label();
            this.deviceListLabel = new System.Windows.Forms.Label();
            this.actionListLabel = new System.Windows.Forms.Label();
            this.lvlListLabel = new System.Windows.Forms.Label();
            this.deviceAddBtn = new System.Windows.Forms.Button();
            this.deviceDelBtn = new System.Windows.Forms.Button();
            this.actionAddBtn = new System.Windows.Forms.Button();
            this.actionDelBtn = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView)).BeginInit();
            this.SuspendLayout();
            // 
            // comboBox1
            // 
            this.comboBox1.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBox1.FormattingEnabled = true;
            this.comboBox1.Location = new System.Drawing.Point(101, 26);
            this.comboBox1.Name = "comboBox1";
            this.comboBox1.Size = new System.Drawing.Size(94, 24);
            this.comboBox1.TabIndex = 0;
            this.comboBox1.SelectedIndexChanged += new System.EventHandler(this.comboBox1_SelectedIndexChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(25, 29);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(36, 17);
            this.label1.TabIndex = 1;
            this.label1.Text = "串口";
            // 
            // serialPort
            // 
            this.serialPort.DataReceived += new System.IO.Ports.SerialDataReceivedEventHandler(this.serialPort_DataReceived);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(25, 59);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(50, 17);
            this.label2.TabIndex = 3;
            this.label2.Text = "波特率";
            // 
            // comboBox2
            // 
            this.comboBox2.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBox2.FormattingEnabled = true;
            this.comboBox2.Location = new System.Drawing.Point(101, 56);
            this.comboBox2.Name = "comboBox2";
            this.comboBox2.Size = new System.Drawing.Size(94, 24);
            this.comboBox2.TabIndex = 2;
            this.comboBox2.SelectedIndexChanged += new System.EventHandler(this.comboBox2_SelectedIndexChanged);
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(510, 54);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(307, 22);
            this.textBox1.TabIndex = 4;
            // 
            // roomList
            // 
            this.roomList.FormattingEnabled = true;
            this.roomList.ItemHeight = 16;
            this.roomList.Location = new System.Drawing.Point(15, 291);
            this.roomList.Name = "roomList";
            this.roomList.Size = new System.Drawing.Size(125, 84);
            this.roomList.TabIndex = 5;
            this.roomList.SelectedIndexChanged += new System.EventHandler(this.roomList_SelectedIndexChanged);
            // 
            // deviceList
            // 
            this.deviceList.FormattingEnabled = true;
            this.deviceList.ItemHeight = 16;
            this.deviceList.Location = new System.Drawing.Point(139, 291);
            this.deviceList.Name = "deviceList";
            this.deviceList.Size = new System.Drawing.Size(120, 84);
            this.deviceList.TabIndex = 6;
            this.deviceList.SelectedIndexChanged += new System.EventHandler(this.deviceList_SelectedIndexChanged);
            // 
            // statusLabel
            // 
            this.statusLabel.AutoSize = true;
            this.statusLabel.Location = new System.Drawing.Point(12, 733);
            this.statusLabel.Name = "statusLabel";
            this.statusLabel.Size = new System.Drawing.Size(36, 17);
            this.statusLabel.TabIndex = 7;
            this.statusLabel.Text = "就绪";
            // 
            // actionList
            // 
            this.actionList.FormattingEnabled = true;
            this.actionList.ItemHeight = 16;
            this.actionList.Location = new System.Drawing.Point(256, 291);
            this.actionList.Name = "actionList";
            this.actionList.Size = new System.Drawing.Size(120, 84);
            this.actionList.TabIndex = 8;
            this.actionList.SelectedIndexChanged += new System.EventHandler(this.actionList_SelectedIndexChanged);
            // 
            // startPortBtn
            // 
            this.startPortBtn.Location = new System.Drawing.Point(215, 26);
            this.startPortBtn.Name = "startPortBtn";
            this.startPortBtn.Size = new System.Drawing.Size(93, 29);
            this.startPortBtn.TabIndex = 9;
            this.startPortBtn.Text = "连接";
            this.startPortBtn.UseVisualStyleBackColor = true;
            this.startPortBtn.Click += new System.EventHandler(this.startPortBtn_Click);
            // 
            // msgBox
            // 
            this.msgBox.Location = new System.Drawing.Point(28, 139);
            this.msgBox.Name = "msgBox";
            this.msgBox.Size = new System.Drawing.Size(280, 22);
            this.msgBox.TabIndex = 10;
            // 
            // msgSendBtn
            // 
            this.msgSendBtn.Enabled = false;
            this.msgSendBtn.Location = new System.Drawing.Point(215, 167);
            this.msgSendBtn.Name = "msgSendBtn";
            this.msgSendBtn.Size = new System.Drawing.Size(93, 32);
            this.msgSendBtn.TabIndex = 11;
            this.msgSendBtn.Text = "发送";
            this.msgSendBtn.UseVisualStyleBackColor = true;
            this.msgSendBtn.Click += new System.EventHandler(this.msgSendBtn_Click);
            // 
            // readDataBtn
            // 
            this.readDataBtn.Location = new System.Drawing.Point(645, 343);
            this.readDataBtn.Name = "readDataBtn";
            this.readDataBtn.Size = new System.Drawing.Size(120, 32);
            this.readDataBtn.TabIndex = 12;
            this.readDataBtn.Text = "读取";
            this.readDataBtn.UseVisualStyleBackColor = true;
            this.readDataBtn.Click += new System.EventHandler(this.readDataBtn_Click);
            // 
            // codeBox
            // 
            this.codeBox.Location = new System.Drawing.Point(493, 305);
            this.codeBox.Name = "codeBox";
            this.codeBox.Size = new System.Drawing.Size(398, 22);
            this.codeBox.TabIndex = 14;
            // 
            // writeDataBtn
            // 
            this.writeDataBtn.Location = new System.Drawing.Point(771, 343);
            this.writeDataBtn.Name = "writeDataBtn";
            this.writeDataBtn.Size = new System.Drawing.Size(120, 32);
            this.writeDataBtn.TabIndex = 15;
            this.writeDataBtn.Text = "写入";
            this.writeDataBtn.UseVisualStyleBackColor = true;
            this.writeDataBtn.Click += new System.EventHandler(this.writeDataBtn_Click);
            // 
            // roomAddBtn
            // 
            this.roomAddBtn.Location = new System.Drawing.Point(15, 381);
            this.roomAddBtn.Name = "roomAddBtn";
            this.roomAddBtn.Size = new System.Drawing.Size(27, 24);
            this.roomAddBtn.TabIndex = 16;
            this.roomAddBtn.Text = "+";
            this.roomAddBtn.UseVisualStyleBackColor = true;
            this.roomAddBtn.Click += new System.EventHandler(this.roomAddBtn_Click);
            // 
            // roomDelBtn
            // 
            this.roomDelBtn.Location = new System.Drawing.Point(48, 381);
            this.roomDelBtn.Name = "roomDelBtn";
            this.roomDelBtn.Size = new System.Drawing.Size(26, 24);
            this.roomDelBtn.TabIndex = 16;
            this.roomDelBtn.Text = "-";
            this.roomDelBtn.UseVisualStyleBackColor = true;
            this.roomDelBtn.Click += new System.EventHandler(this.roomDelBtn_Click);
            // 
            // dataGridView
            // 
            this.dataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView.Enabled = false;
            this.dataGridView.Location = new System.Drawing.Point(15, 425);
            this.dataGridView.Name = "dataGridView";
            this.dataGridView.RowTemplate.Height = 24;
            this.dataGridView.Size = new System.Drawing.Size(934, 305);
            this.dataGridView.TabIndex = 17;
            // 
            // lvlSelect
            // 
            this.lvlSelect.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.lvlSelect.FormattingEnabled = true;
            this.lvlSelect.Location = new System.Drawing.Point(63, 234);
            this.lvlSelect.Name = "lvlSelect";
            this.lvlSelect.Size = new System.Drawing.Size(125, 24);
            this.lvlSelect.TabIndex = 18;
            this.lvlSelect.SelectedIndexChanged += new System.EventHandler(this.lvlSelect_SelectedIndexChanged);
            // 
            // levelAddBtn
            // 
            this.levelAddBtn.Location = new System.Drawing.Point(194, 229);
            this.levelAddBtn.Name = "levelAddBtn";
            this.levelAddBtn.Size = new System.Drawing.Size(88, 32);
            this.levelAddBtn.TabIndex = 19;
            this.levelAddBtn.Text = "添加楼层";
            this.levelAddBtn.UseVisualStyleBackColor = true;
            this.levelAddBtn.Click += new System.EventHandler(this.levelAddBtn_Click);
            // 
            // levelDelBtn
            // 
            this.levelDelBtn.Location = new System.Drawing.Point(288, 229);
            this.levelDelBtn.Name = "levelDelBtn";
            this.levelDelBtn.Size = new System.Drawing.Size(88, 32);
            this.levelDelBtn.TabIndex = 20;
            this.levelDelBtn.Text = "删除楼层";
            this.levelDelBtn.UseVisualStyleBackColor = true;
            this.levelDelBtn.Click += new System.EventHandler(this.levelDelBtn_Click);
            // 
            // roomListLabel
            // 
            this.roomListLabel.AutoSize = true;
            this.roomListLabel.Location = new System.Drawing.Point(12, 271);
            this.roomListLabel.Name = "roomListLabel";
            this.roomListLabel.Size = new System.Drawing.Size(36, 17);
            this.roomListLabel.TabIndex = 21;
            this.roomListLabel.Text = "房间";
            // 
            // deviceListLabel
            // 
            this.deviceListLabel.AutoSize = true;
            this.deviceListLabel.Location = new System.Drawing.Point(136, 271);
            this.deviceListLabel.Name = "deviceListLabel";
            this.deviceListLabel.Size = new System.Drawing.Size(36, 17);
            this.deviceListLabel.TabIndex = 22;
            this.deviceListLabel.Text = "设备";
            // 
            // actionListLabel
            // 
            this.actionListLabel.AutoSize = true;
            this.actionListLabel.Location = new System.Drawing.Point(253, 271);
            this.actionListLabel.Name = "actionListLabel";
            this.actionListLabel.Size = new System.Drawing.Size(36, 17);
            this.actionListLabel.TabIndex = 23;
            this.actionListLabel.Text = "操作";
            // 
            // lvlListLabel
            // 
            this.lvlListLabel.AutoSize = true;
            this.lvlListLabel.Location = new System.Drawing.Point(11, 237);
            this.lvlListLabel.Name = "lvlListLabel";
            this.lvlListLabel.Size = new System.Drawing.Size(36, 17);
            this.lvlListLabel.TabIndex = 24;
            this.lvlListLabel.Text = "楼层";
            // 
            // deviceAddBtn
            // 
            this.deviceAddBtn.Location = new System.Drawing.Point(139, 381);
            this.deviceAddBtn.Name = "deviceAddBtn";
            this.deviceAddBtn.Size = new System.Drawing.Size(33, 24);
            this.deviceAddBtn.TabIndex = 25;
            this.deviceAddBtn.Text = "+";
            this.deviceAddBtn.UseVisualStyleBackColor = true;
            this.deviceAddBtn.Click += new System.EventHandler(this.deviceAddBtn_Click);
            // 
            // deviceDelBtn
            // 
            this.deviceDelBtn.Location = new System.Drawing.Point(178, 381);
            this.deviceDelBtn.Name = "deviceDelBtn";
            this.deviceDelBtn.Size = new System.Drawing.Size(33, 24);
            this.deviceDelBtn.TabIndex = 25;
            this.deviceDelBtn.Text = "-";
            this.deviceDelBtn.UseVisualStyleBackColor = true;
            this.deviceDelBtn.Click += new System.EventHandler(this.deviceDelBtn_Click);
            // 
            // actionAddBtn
            // 
            this.actionAddBtn.Location = new System.Drawing.Point(256, 381);
            this.actionAddBtn.Name = "actionAddBtn";
            this.actionAddBtn.Size = new System.Drawing.Size(33, 24);
            this.actionAddBtn.TabIndex = 25;
            this.actionAddBtn.Text = "+";
            this.actionAddBtn.UseVisualStyleBackColor = true;
            this.actionAddBtn.Click += new System.EventHandler(this.actionAddBtn_Click);
            // 
            // actionDelBtn
            // 
            this.actionDelBtn.Location = new System.Drawing.Point(295, 381);
            this.actionDelBtn.Name = "actionDelBtn";
            this.actionDelBtn.Size = new System.Drawing.Size(33, 24);
            this.actionDelBtn.TabIndex = 25;
            this.actionDelBtn.Text = "-";
            this.actionDelBtn.UseVisualStyleBackColor = true;
            this.actionDelBtn.Click += new System.EventHandler(this.actionDelBtn_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(961, 753);
            this.Controls.Add(this.actionDelBtn);
            this.Controls.Add(this.actionAddBtn);
            this.Controls.Add(this.deviceDelBtn);
            this.Controls.Add(this.deviceAddBtn);
            this.Controls.Add(this.lvlListLabel);
            this.Controls.Add(this.actionListLabel);
            this.Controls.Add(this.deviceListLabel);
            this.Controls.Add(this.roomListLabel);
            this.Controls.Add(this.levelDelBtn);
            this.Controls.Add(this.levelAddBtn);
            this.Controls.Add(this.lvlSelect);
            this.Controls.Add(this.dataGridView);
            this.Controls.Add(this.roomDelBtn);
            this.Controls.Add(this.roomAddBtn);
            this.Controls.Add(this.writeDataBtn);
            this.Controls.Add(this.codeBox);
            this.Controls.Add(this.readDataBtn);
            this.Controls.Add(this.msgSendBtn);
            this.Controls.Add(this.msgBox);
            this.Controls.Add(this.startPortBtn);
            this.Controls.Add(this.actionList);
            this.Controls.Add(this.statusLabel);
            this.Controls.Add(this.deviceList);
            this.Controls.Add(this.roomList);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.comboBox2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.comboBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "Smart Home Control & Rule Editor";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox comboBox1;
        private System.Windows.Forms.Label label1;
        private System.IO.Ports.SerialPort serialPort;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox comboBox2;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.ListBox roomList;
        private System.Windows.Forms.ListBox deviceList;
        private System.Windows.Forms.Label statusLabel;
        private System.Windows.Forms.ListBox actionList;
        private System.Windows.Forms.Button startPortBtn;
        private System.Windows.Forms.TextBox msgBox;
        private System.Windows.Forms.Button msgSendBtn;
        private System.Windows.Forms.Button readDataBtn;
        private System.Windows.Forms.TextBox codeBox;
        private System.Windows.Forms.Button writeDataBtn;
        private System.Windows.Forms.Button roomAddBtn;
        private System.Windows.Forms.Button roomDelBtn;
        private System.Windows.Forms.DataGridView dataGridView;
        private System.Windows.Forms.ComboBox lvlSelect;
        private System.Windows.Forms.Button levelAddBtn;
        private System.Windows.Forms.Button levelDelBtn;
        private System.Windows.Forms.Label roomListLabel;
        private System.Windows.Forms.Label deviceListLabel;
        private System.Windows.Forms.Label actionListLabel;
        private System.Windows.Forms.Label lvlListLabel;
        private System.Windows.Forms.Button deviceAddBtn;
        private System.Windows.Forms.Button deviceDelBtn;
        private System.Windows.Forms.Button actionAddBtn;
        private System.Windows.Forms.Button actionDelBtn;
    }
}

