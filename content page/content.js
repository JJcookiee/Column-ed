document.addEventListener("DOMContentLoaded", () => {

    function createPopup(id){
        let popupNode = document.querySelector(id);
        let overlay = popupNode.querySelector(".overlay");
        let closeButton = popupNode.querySelector(".closeButton");

        function openPopup(){
            popupNode.classList.add("active");
        }
        function closePopup(){
            popupNode.classList.remove("active");
        }

        overlay.addEventListener("click", closePopup);
        closeButton.addEventListener("click", closePopup);

        return openPopup;
    }

    let openPopupFunc = createPopup("#popup");

    document.querySelector("#openPopup").addEventListener("click", openPopupFunc);
});
