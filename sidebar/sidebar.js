var finalList = "Not Loaded";

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handlePicked, false);

function handlePicked() {
    var f = this.files[0];
    read(f);    
}

function read(myfile){
    var reader = new FileReader();

    reader.onload = async function (e) {
        var fields = e.target.result.split("\n");
        for(var i = 0;i < fields.length - 1;i++){
            browser.tabs.create({ url : fields[i]});
        }
    }

    reader.readAsText(myfile);
}
const loadtabs = document.getElementById("load-tabs")
loadtabs.addEventListener("click", function(){
    browser.tabs.query({},function (tabs) {
        var totalNbTabs = tabs.length
        var list = "";
        var listhtml = "";
        var count = 0;
        for (var i = 0; i < totalNbTabs; i++) {
            if(tabs[i].url.includes('http')){
                list += tabs[i].url;
                list += "\n";
                count++;
                listhtml += `<li>${tabs[i].title}</li>`;
            }
        }
        document.getElementById("tab-list").innerHTML = listhtml;
        document.getElementById("tab-count").innerHTML = count.toString() + " Tabs";
        finalList = list;
    })
})

document.getElementById("save-tabs").addEventListener("click", function(){
    if(finalList === "Not Loaded" || finalList === ""){
        alert("There are no loaded tabs.");
    }else{
        browser.runtime.sendMessage(finalList);
    }
})