window.addEventListener('load', () => {
    fetch('../jsons/discover.json')
    .then((response) => response.json())
    .then((json) => {
        var myJson = json;
        for(i=0;i<myJson.length;i++){
            image_path = myJson[i].image_link;
            category_name = myJson[i].name;
            create_category(category_name,image_path);
        }
    });
});

function create_category(category_name,image_path){
    main = document.getElementById("main");
    var box = document.createElement("div");
    box.className = "box";
    var box_inner = `
                <p class="text">`+category_name+`</p>
                <img src="`+image_path+`" alt="iamge">
            `;

    box.innerHTML = box_inner;
    main.appendChild(box);
}