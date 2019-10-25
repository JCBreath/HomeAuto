class Item {
    constructor(id, property, parent, height, width) {
        this.id = id;
        this.name = property.name;
        this.type = property.type;
        this.dev_id = property.id;
        this.status = property.status;
        this.style = property.style;
        this.elements = property.elements;
        this.parent = parent;
        this.height = height;
        this.width = width;
        //console.log(codes);
    }



    Render() {
        var item = document.createElement("div");

        item.id = this.id;
        item.className = "item";
        item.status = this.status;
        item.dev_id = this.dev_id;
        var style = item.style;
        style.height = this.height;
        style.width = this.width;
        
        item.onmouseover = function() {

        };

        item.onmouseout = function() {

        };

        
        if(this.status != -1) {
            item.onclick = function() {
                console.log(this.status);
                var code;
                var _item = item;
                // if(this.status == 0) {
                //     this.status = 1;
                //     this.childNodes[0].className = "item-text-on";
                //     this.childNodes[1].className = "item-indicator-on";
                // } else if(this.status == 1) {
                //     code = this.off;
                //     this.status = 0;
                //     this.childNodes[0].className = "item-text";
                //     this.childNodes[1].className = "item-indicator";
                // }
                 
                
                var request = new XMLHttpRequest();
                request.open("GET", "rs?dev_id=" + this.dev_id + "&action=toggle");
                request.onreadystatechange = function() {
                    var item = _item;
                    if (request.readyState !== 4) {
                        return;
                    }
            
                    if (request.status === 200) {
                        var status = parseInt(request.responseText);
                        console.log(status);
                        if(status == 0) {
                            item.childNodes[0].className = "item-text";
                            item.childNodes[1].className = "item-indicator";
                        } else if (status == 1) {
                            item.childNodes[0].className = "item-text-on";
                            item.childNodes[1].className = "item-indicator-on";
                        }
                        console.log("发送485成功")
                    }
                };
                
                request.send(null);
            };
        }

        var text = document.createElement("a");
        var indicator = document.createElement("div");
        text.textContent = this.name;
        if(this.status == 0) {
            text.className = "item-text";
            indicator.className = "item-indicator";
        } else if(this.status == 1) {
            text.className = "item-text-on";
            indicator.className = "item-indicator-on";
        } else if(this.status == -1) {
            text.className = "item-text-disabled";
            indicator.className = "item-indicator-disabled";
        }

        item.appendChild(text);
        item.appendChild(indicator);
        if(!this.style)
            this.parent.appendChild(item);
        else if(this.style == "DD01") {
            var item = document.createElement("div");
            item.className = "DD01-item";
            
            var item_text = document.createElement("div");
            item_text.className = "DD01-item-text";
            item_text.textContent = this.name;
            item.appendChild(item_text);
            
            for(var i=0; i<this.elements.length; i++) {
                var element = document.createElement("div");
                element.className = "DD01-element-" + i;
                element.textContent = this.elements[i].name;
                element.value = this.elements[i].value;

                element.onclick = function() {
                    var request = new XMLHttpRequest();
                    request.open("GET", "rs?action=switch&code=" + this.value);
                    request.onreadystatechange = function() {
                        
                    };
                    
                    request.send(null);
                };
                item.appendChild(element);
            }

            this.parent.appendChild(item);
        } else if(this.style == "DD02") {
            var item = document.createElement("div");
            item.className = this.style + "-item";
            
            var item_text = document.createElement("div");
            item_text.className = this.style + "-item-text";
            item_text.textContent = this.name;
            item.appendChild(item_text);
            
            for(var i=0; i<this.elements.length; i++) {
                var element = document.createElement("div");
                element.className = this.style + "-element-" + i;
                element.textContent = this.elements[i].name;
                element.value = this.elements[i].value;

                element.onclick = function() {
                    var request = new XMLHttpRequest();
                    request.open("GET", "rs?action=switch&code=" + this.value);
                    request.onreadystatechange = function() {
                        
                    };
                    
                    request.send(null);
                };
                item.appendChild(element);
            }

            this.parent.appendChild(item);
        }
    }
}