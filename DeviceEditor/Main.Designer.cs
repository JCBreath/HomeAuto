namespace DeviceEditor
{
    partial class Main
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.actionDataGridView = new System.Windows.Forms.DataGridView();
            this.addDevBtn = new System.Windows.Forms.Button();
            this.lvlCombo = new System.Windows.Forms.ComboBox();
            this.lvlLabel = new System.Windows.Forms.Label();
            this.typeCombo = new System.Windows.Forms.ComboBox();
            this.nameText = new System.Windows.Forms.TextBox();
            this.nameLabel = new System.Windows.Forms.Label();
            this.idLabel = new System.Windows.Forms.Label();
            this.idText = new System.Windows.Forms.TextBox();
            this.idInfoText = new System.Windows.Forms.Label();
            this.typeLabel = new System.Windows.Forms.Label();
            this.roomLabel = new System.Windows.Forms.Label();
            this.roomList = new System.Windows.Forms.ListBox();
            this.addressLabel = new System.Windows.Forms.Label();
            this.addressText = new System.Windows.Forms.TextBox();
            this.autogenCheck = new System.Windows.Forms.CheckBox();
            this.deviceDataGridView = new System.Windows.Forms.DataGridView();
            this.checkBox1 = new System.Windows.Forms.CheckBox();
            this.button1 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.actionDataGridView)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.deviceDataGridView)).BeginInit();
            this.SuspendLayout();
            // 
            // actionDataGridView
            // 
            this.actionDataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.actionDataGridView.Location = new System.Drawing.Point(12, 361);
            this.actionDataGridView.Name = "actionDataGridView";
            this.actionDataGridView.RowTemplate.Height = 23;
            this.actionDataGridView.Size = new System.Drawing.Size(595, 115);
            this.actionDataGridView.TabIndex = 0;
            // 
            // addDevBtn
            // 
            this.addDevBtn.Location = new System.Drawing.Point(532, 157);
            this.addDevBtn.Name = "addDevBtn";
            this.addDevBtn.Size = new System.Drawing.Size(75, 31);
            this.addDevBtn.TabIndex = 1;
            this.addDevBtn.Text = "添加设备";
            this.addDevBtn.UseVisualStyleBackColor = true;
            // 
            // lvlCombo
            // 
            this.lvlCombo.FormattingEnabled = true;
            this.lvlCombo.Location = new System.Drawing.Point(486, 12);
            this.lvlCombo.Name = "lvlCombo";
            this.lvlCombo.Size = new System.Drawing.Size(121, 21);
            this.lvlCombo.TabIndex = 2;
            this.lvlCombo.SelectedIndexChanged += new System.EventHandler(this.lvlCombo_SelectedIndexChanged);
            // 
            // lvlLabel
            // 
            this.lvlLabel.AutoSize = true;
            this.lvlLabel.Location = new System.Drawing.Point(438, 15);
            this.lvlLabel.Name = "lvlLabel";
            this.lvlLabel.Size = new System.Drawing.Size(31, 13);
            this.lvlLabel.TabIndex = 3;
            this.lvlLabel.Text = "楼层";
            // 
            // typeCombo
            // 
            this.typeCombo.FormattingEnabled = true;
            this.typeCombo.Location = new System.Drawing.Point(71, 78);
            this.typeCombo.Name = "typeCombo";
            this.typeCombo.Size = new System.Drawing.Size(182, 21);
            this.typeCombo.TabIndex = 5;
            // 
            // nameText
            // 
            this.nameText.Location = new System.Drawing.Point(71, 46);
            this.nameText.Name = "nameText";
            this.nameText.Size = new System.Drawing.Size(182, 20);
            this.nameText.TabIndex = 6;
            // 
            // nameLabel
            // 
            this.nameLabel.AutoSize = true;
            this.nameLabel.Location = new System.Drawing.Point(12, 49);
            this.nameLabel.Name = "nameLabel";
            this.nameLabel.Size = new System.Drawing.Size(55, 13);
            this.nameLabel.TabIndex = 7;
            this.nameLabel.Text = "设备名称";
            // 
            // idLabel
            // 
            this.idLabel.AutoSize = true;
            this.idLabel.Location = new System.Drawing.Point(12, 18);
            this.idLabel.Name = "idLabel";
            this.idLabel.Size = new System.Drawing.Size(42, 13);
            this.idLabel.TabIndex = 8;
            this.idLabel.Text = "设备ID";
            // 
            // idText
            // 
            this.idText.Location = new System.Drawing.Point(71, 12);
            this.idText.Name = "idText";
            this.idText.ReadOnly = true;
            this.idText.Size = new System.Drawing.Size(182, 20);
            this.idText.TabIndex = 9;
            // 
            // idInfoText
            // 
            this.idInfoText.AutoSize = true;
            this.idInfoText.Location = new System.Drawing.Point(266, 15);
            this.idInfoText.Name = "idInfoText";
            this.idInfoText.Size = new System.Drawing.Size(85, 13);
            this.idInfoText.TabIndex = 10;
            this.idInfoText.Text = "(强制自动生成)";
            // 
            // typeLabel
            // 
            this.typeLabel.AutoSize = true;
            this.typeLabel.Location = new System.Drawing.Point(12, 81);
            this.typeLabel.Name = "typeLabel";
            this.typeLabel.Size = new System.Drawing.Size(55, 13);
            this.typeLabel.TabIndex = 13;
            this.typeLabel.Text = "设备类别";
            // 
            // roomLabel
            // 
            this.roomLabel.AutoSize = true;
            this.roomLabel.Location = new System.Drawing.Point(438, 43);
            this.roomLabel.Name = "roomLabel";
            this.roomLabel.Size = new System.Drawing.Size(31, 13);
            this.roomLabel.TabIndex = 11;
            this.roomLabel.Text = "房间";
            // 
            // roomList
            // 
            this.roomList.FormattingEnabled = true;
            this.roomList.Location = new System.Drawing.Point(486, 43);
            this.roomList.Name = "roomList";
            this.roomList.Size = new System.Drawing.Size(121, 95);
            this.roomList.TabIndex = 14;
            this.roomList.SelectedValueChanged += new System.EventHandler(this.roomList_SelectedValueChanged);
            // 
            // addressLabel
            // 
            this.addressLabel.AutoSize = true;
            this.addressLabel.Location = new System.Drawing.Point(12, 116);
            this.addressLabel.Name = "addressLabel";
            this.addressLabel.Size = new System.Drawing.Size(55, 13);
            this.addressLabel.TabIndex = 15;
            this.addressLabel.Text = "设备地址";
            // 
            // addressText
            // 
            this.addressText.Location = new System.Drawing.Point(73, 113);
            this.addressText.Name = "addressText";
            this.addressText.Size = new System.Drawing.Size(286, 20);
            this.addressText.TabIndex = 16;
            // 
            // autogenCheck
            // 
            this.autogenCheck.AutoSize = true;
            this.autogenCheck.Checked = true;
            this.autogenCheck.CheckState = System.Windows.Forms.CheckState.Checked;
            this.autogenCheck.Location = new System.Drawing.Point(259, 48);
            this.autogenCheck.Name = "autogenCheck";
            this.autogenCheck.Size = new System.Drawing.Size(98, 17);
            this.autogenCheck.TabIndex = 17;
            this.autogenCheck.Text = "自动添加前缀";
            this.autogenCheck.UseVisualStyleBackColor = true;
            // 
            // deviceDataGridView
            // 
            this.deviceDataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.deviceDataGridView.Location = new System.Drawing.Point(13, 206);
            this.deviceDataGridView.Name = "deviceDataGridView";
            this.deviceDataGridView.Size = new System.Drawing.Size(594, 139);
            this.deviceDataGridView.TabIndex = 18;
            // 
            // checkBox1
            // 
            this.checkBox1.AutoSize = true;
            this.checkBox1.Checked = true;
            this.checkBox1.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBox1.Location = new System.Drawing.Point(285, 80);
            this.checkBox1.Name = "checkBox1";
            this.checkBox1.Size = new System.Drawing.Size(74, 17);
            this.checkBox1.TabIndex = 19;
            this.checkBox1.Text = "显示协议";
            this.checkBox1.UseVisualStyleBackColor = true;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(365, 76);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(104, 23);
            this.button1.TabIndex = 20;
            this.button1.Text = "打开类别编辑器";
            this.button1.UseVisualStyleBackColor = true;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(625, 488);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.checkBox1);
            this.Controls.Add(this.deviceDataGridView);
            this.Controls.Add(this.autogenCheck);
            this.Controls.Add(this.addressText);
            this.Controls.Add(this.addressLabel);
            this.Controls.Add(this.roomList);
            this.Controls.Add(this.typeLabel);
            this.Controls.Add(this.roomLabel);
            this.Controls.Add(this.idInfoText);
            this.Controls.Add(this.idText);
            this.Controls.Add(this.idLabel);
            this.Controls.Add(this.nameLabel);
            this.Controls.Add(this.nameText);
            this.Controls.Add(this.typeCombo);
            this.Controls.Add(this.lvlLabel);
            this.Controls.Add(this.lvlCombo);
            this.Controls.Add(this.addDevBtn);
            this.Controls.Add(this.actionDataGridView);
            this.Name = "Main";
            this.Text = "设备数据编辑器";
            this.Load += new System.EventHandler(this.Main_Load);
            ((System.ComponentModel.ISupportInitialize)(this.actionDataGridView)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.deviceDataGridView)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView actionDataGridView;
        private System.Windows.Forms.Button addDevBtn;
        private System.Windows.Forms.ComboBox lvlCombo;
        private System.Windows.Forms.Label lvlLabel;
        private System.Windows.Forms.ComboBox typeCombo;
        private System.Windows.Forms.TextBox nameText;
        private System.Windows.Forms.Label nameLabel;
        private System.Windows.Forms.Label idLabel;
        private System.Windows.Forms.TextBox idText;
        private System.Windows.Forms.Label idInfoText;
        private System.Windows.Forms.Label typeLabel;
        private System.Windows.Forms.Label roomLabel;
        private System.Windows.Forms.ListBox roomList;
        private System.Windows.Forms.Label addressLabel;
        private System.Windows.Forms.TextBox addressText;
        private System.Windows.Forms.CheckBox autogenCheck;
        private System.Windows.Forms.DataGridView deviceDataGridView;
        private System.Windows.Forms.CheckBox checkBox1;
        private System.Windows.Forms.Button button1;
    }
}

