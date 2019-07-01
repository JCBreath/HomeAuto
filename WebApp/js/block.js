class Block {
    constructor(id, property, parent) {
        this.id = id;
        this.name = property.name;
        this.type = property.type;
        this.items = property.devices;
        this.parent = parent;
    }

    AddTitle(parent, str) {
        var title = document.createElement('div');
        var title_text = document.createElement('a');

        var style = title.style;
        style.display = "flex";
        style.width = "100%";
        style.maxWidth = "500px";
        style.backgroundColor = "#ffffff";
        style.padding = "5px 0px 5px 0px";
        style.border = "solid 1px #efefef";
        style.borderBottom = "none";
        style.color = "#656565";
        style.margin = "20px auto 0px auto";
        
        title_text.style.textAlign = "center";
        title_text.style.margin = "0 0 0 15px";
        title_text.textContent = str;

        title.appendChild(title_text);

        var fill_bottom = document.getElementsByClassName("display-fill")[1];
        parent.insertBefore(title, fill_bottom);
    }

    Render() {
        var block = document.createElement("div");
        block.id = this.id;
        block.className = "ctrl-blk";
        var style = block.style;
        style.display = "flex";
        style.flexDirection = "row";
        style.alignContent = "center";
        style.justifyContent = "center";
        style.padding = "10px 0 10px 0";
        style.maxWidth = "500px";
        style.width = "100%";

        var inner_block = document.createElement("div");
        style = inner_block.style;
        style.display = "flex";
        style.flexDirection = "row";
        style.flexWrap = "wrap";
        style.width = "90%";
        style.maxWidth = "460px";
        // style.border = "solid 1px #438ac7";
        style.borderRadius = "3px";

        

        this.AddTitle(this.parent, this.name);

        for(var i=0; i<this.items.length; i++) {
            const _item = this.items[i];
            
            var item = new Item(this.id + "-item-" + i, _item, inner_block, "50px", "50%");
            item.Render();
        }


        block.appendChild(inner_block);

        var fill_bottom = document.getElementsByClassName("display-fill")[1];
        this.parent.insertBefore(block, fill_bottom);
    }
}