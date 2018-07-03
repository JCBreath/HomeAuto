namespace SmartHomeSignalControl
{
    partial class MainForm
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
            this.ipBox = new System.Windows.Forms.TextBox();
            this.portBox = new System.Windows.Forms.TextBox();
            this.sendMsgBox = new System.Windows.Forms.TextBox();
            this.ConnBtn = new System.Windows.Forms.Button();
            this.MsgSendBtn = new System.Windows.Forms.Button();
            this.IpLabel = new System.Windows.Forms.Label();
            this.PortLabel = new System.Windows.Forms.Label();
            this.MsgSendLabel = new System.Windows.Forms.Label();
            this.MsgRecvLabel = new System.Windows.Forms.Label();
            this.ConnMethodComboBox = new System.Windows.Forms.ComboBox();
            this.ConnMethodLabel = new System.Windows.Forms.Label();
            this.MsgRecvBox = new System.Windows.Forms.ListBox();
            this.MsgSentHistoryBox = new System.Windows.Forms.ListBox();
            this.MsgSentHistoryLabel = new System.Windows.Forms.Label();
            this.SaveClearBtn = new System.Windows.Forms.Button();
            this.ClrHisBtn = new System.Windows.Forms.Button();
            this.DelHisBtn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // ipBox
            // 
            this.ipBox.Location = new System.Drawing.Point(85, 41);
            this.ipBox.Name = "ipBox";
            this.ipBox.Size = new System.Drawing.Size(100, 22);
            this.ipBox.TabIndex = 0;
            // 
            // portBox
            // 
            this.portBox.Location = new System.Drawing.Point(85, 69);
            this.portBox.Name = "portBox";
            this.portBox.Size = new System.Drawing.Size(100, 22);
            this.portBox.TabIndex = 0;
            // 
            // sendMsgBox
            // 
            this.sendMsgBox.Location = new System.Drawing.Point(85, 191);
            this.sendMsgBox.Name = "sendMsgBox";
            this.sendMsgBox.Size = new System.Drawing.Size(220, 22);
            this.sendMsgBox.TabIndex = 0;
            // 
            // ConnBtn
            // 
            this.ConnBtn.Location = new System.Drawing.Point(205, 12);
            this.ConnBtn.Name = "ConnBtn";
            this.ConnBtn.Size = new System.Drawing.Size(100, 23);
            this.ConnBtn.TabIndex = 1;
            this.ConnBtn.Text = "连接";
            this.ConnBtn.UseVisualStyleBackColor = true;
            this.ConnBtn.Click += new System.EventHandler(this.ConnBtn_Click);
            // 
            // MsgSendBtn
            // 
            this.MsgSendBtn.Location = new System.Drawing.Point(230, 219);
            this.MsgSendBtn.Name = "MsgSendBtn";
            this.MsgSendBtn.Size = new System.Drawing.Size(75, 23);
            this.MsgSendBtn.TabIndex = 2;
            this.MsgSendBtn.Text = "发送";
            this.MsgSendBtn.UseVisualStyleBackColor = true;
            this.MsgSendBtn.Click += new System.EventHandler(this.MsgSendBtn_Click);
            // 
            // IpLabel
            // 
            this.IpLabel.AutoSize = true;
            this.IpLabel.Location = new System.Drawing.Point(15, 44);
            this.IpLabel.Name = "IpLabel";
            this.IpLabel.Size = new System.Drawing.Size(20, 17);
            this.IpLabel.TabIndex = 4;
            this.IpLabel.Text = "IP";
            // 
            // PortLabel
            // 
            this.PortLabel.AutoSize = true;
            this.PortLabel.Location = new System.Drawing.Point(15, 72);
            this.PortLabel.Name = "PortLabel";
            this.PortLabel.Size = new System.Drawing.Size(36, 17);
            this.PortLabel.TabIndex = 4;
            this.PortLabel.Text = "端口";
            // 
            // MsgSendLabel
            // 
            this.MsgSendLabel.AutoSize = true;
            this.MsgSendLabel.Location = new System.Drawing.Point(15, 194);
            this.MsgSendLabel.Name = "MsgSendLabel";
            this.MsgSendLabel.Size = new System.Drawing.Size(64, 17);
            this.MsgSendLabel.TabIndex = 4;
            this.MsgSendLabel.Text = "发送信息";
            // 
            // MsgRecvLabel
            // 
            this.MsgRecvLabel.AutoSize = true;
            this.MsgRecvLabel.Location = new System.Drawing.Point(15, 101);
            this.MsgRecvLabel.Name = "MsgRecvLabel";
            this.MsgRecvLabel.Size = new System.Drawing.Size(64, 17);
            this.MsgRecvLabel.TabIndex = 4;
            this.MsgRecvLabel.Text = "收到信息";
            // 
            // ConnMethodComboBox
            // 
            this.ConnMethodComboBox.Enabled = false;
            this.ConnMethodComboBox.FormattingEnabled = true;
            this.ConnMethodComboBox.Location = new System.Drawing.Point(85, 11);
            this.ConnMethodComboBox.Name = "ConnMethodComboBox";
            this.ConnMethodComboBox.Size = new System.Drawing.Size(100, 24);
            this.ConnMethodComboBox.TabIndex = 5;
            // 
            // ConnMethodLabel
            // 
            this.ConnMethodLabel.AutoSize = true;
            this.ConnMethodLabel.Location = new System.Drawing.Point(15, 14);
            this.ConnMethodLabel.Name = "ConnMethodLabel";
            this.ConnMethodLabel.Size = new System.Drawing.Size(64, 17);
            this.ConnMethodLabel.TabIndex = 6;
            this.ConnMethodLabel.Text = "连接方式";
            // 
            // MsgRecvBox
            // 
            this.MsgRecvBox.FormattingEnabled = true;
            this.MsgRecvBox.ItemHeight = 16;
            this.MsgRecvBox.Location = new System.Drawing.Point(85, 101);
            this.MsgRecvBox.Name = "MsgRecvBox";
            this.MsgRecvBox.Size = new System.Drawing.Size(220, 84);
            this.MsgRecvBox.TabIndex = 7;
            // 
            // MsgSentHistoryBox
            // 
            this.MsgSentHistoryBox.FormattingEnabled = true;
            this.MsgSentHistoryBox.ItemHeight = 16;
            this.MsgSentHistoryBox.Location = new System.Drawing.Point(85, 248);
            this.MsgSentHistoryBox.Name = "MsgSentHistoryBox";
            this.MsgSentHistoryBox.Size = new System.Drawing.Size(220, 84);
            this.MsgSentHistoryBox.TabIndex = 8;
            this.MsgSentHistoryBox.DoubleClick += new System.EventHandler(this.MsgSentHistoryBox_DoubleClick);
            // 
            // MsgSentHistoryLabel
            // 
            this.MsgSentHistoryLabel.AutoSize = true;
            this.MsgSentHistoryLabel.Location = new System.Drawing.Point(15, 248);
            this.MsgSentHistoryLabel.Name = "MsgSentHistoryLabel";
            this.MsgSentHistoryLabel.Size = new System.Drawing.Size(64, 17);
            this.MsgSentHistoryLabel.TabIndex = 9;
            this.MsgSentHistoryLabel.Text = "发送历史";
            // 
            // SaveClearBtn
            // 
            this.SaveClearBtn.Location = new System.Drawing.Point(205, 41);
            this.SaveClearBtn.Name = "SaveClearBtn";
            this.SaveClearBtn.Size = new System.Drawing.Size(99, 23);
            this.SaveClearBtn.TabIndex = 10;
            this.SaveClearBtn.Text = "清空保存数据";
            this.SaveClearBtn.UseVisualStyleBackColor = true;
            this.SaveClearBtn.Click += new System.EventHandler(this.SaveClearBtn_Click);
            // 
            // ClrHisBtn
            // 
            this.ClrHisBtn.Location = new System.Drawing.Point(149, 338);
            this.ClrHisBtn.Name = "ClrHisBtn";
            this.ClrHisBtn.Size = new System.Drawing.Size(75, 23);
            this.ClrHisBtn.TabIndex = 11;
            this.ClrHisBtn.Text = "清空";
            this.ClrHisBtn.UseVisualStyleBackColor = true;
            this.ClrHisBtn.Click += new System.EventHandler(this.ClrHisBtn_Click);
            // 
            // DelHisBtn
            // 
            this.DelHisBtn.Location = new System.Drawing.Point(230, 338);
            this.DelHisBtn.Name = "DelHisBtn";
            this.DelHisBtn.Size = new System.Drawing.Size(75, 23);
            this.DelHisBtn.TabIndex = 12;
            this.DelHisBtn.Text = "删除选中项";
            this.DelHisBtn.UseVisualStyleBackColor = true;
            this.DelHisBtn.Click += new System.EventHandler(this.DelHisBtn_Click);
            // 
            // MainForm
            // 
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None;
            this.ClientSize = new System.Drawing.Size(316, 368);
            this.Controls.Add(this.DelHisBtn);
            this.Controls.Add(this.ClrHisBtn);
            this.Controls.Add(this.SaveClearBtn);
            this.Controls.Add(this.MsgSentHistoryLabel);
            this.Controls.Add(this.MsgSentHistoryBox);
            this.Controls.Add(this.MsgRecvBox);
            this.Controls.Add(this.ConnMethodLabel);
            this.Controls.Add(this.ConnMethodComboBox);
            this.Controls.Add(this.MsgRecvLabel);
            this.Controls.Add(this.MsgSendLabel);
            this.Controls.Add(this.PortLabel);
            this.Controls.Add(this.IpLabel);
            this.Controls.Add(this.MsgSendBtn);
            this.Controls.Add(this.ConnBtn);
            this.Controls.Add(this.sendMsgBox);
            this.Controls.Add(this.portBox);
            this.Controls.Add(this.ipBox);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "MainForm";
            this.Text = "TCP/UDP/COM 调试";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox ipBox;
        private System.Windows.Forms.TextBox portBox;
        private System.Windows.Forms.TextBox sendMsgBox;
        private System.Windows.Forms.Button ConnBtn;
        private System.Windows.Forms.Button MsgSendBtn;
        private System.Windows.Forms.Label IpLabel;
        private System.Windows.Forms.Label PortLabel;
        private System.Windows.Forms.Label MsgSendLabel;
        private System.Windows.Forms.Label MsgRecvLabel;
        private System.Windows.Forms.ComboBox ConnMethodComboBox;
        private System.Windows.Forms.Label ConnMethodLabel;
        private System.Windows.Forms.ListBox MsgRecvBox;
        private System.Windows.Forms.ListBox MsgSentHistoryBox;
        private System.Windows.Forms.Label MsgSentHistoryLabel;
        private System.Windows.Forms.Button SaveClearBtn;
        private System.Windows.Forms.Button ClrHisBtn;
        private System.Windows.Forms.Button DelHisBtn;
    }
}

