var inputName = document.getElementById("inputName");
var inputURL = document.getElementById("inputURL");
var tableContent = document.getElementById("tableContent");
var lightBoxContainer = document.getElementById("lightBoxContainer");
var lightBoxClose = document.getElementById("lightBoxClose");
var lightBox = document.getElementById("lightBox");
var bookMarkList = [];
if (localStorage.getItem("bookMarkList")) {
  bookMarkList = JSON.parse(localStorage.getItem("bookMarkList"));
  display();
}

lightBoxClose.addEventListener("click", function (e) {
  lightBoxContainer.classList.replace("d-flex", "d-none");
});
lightBoxContainer.addEventListener("click", function (e) {
  lightBoxContainer.classList.replace("d-flex", "d-none");
});
lightBox.addEventListener("click", function (e) {
  e.stopPropagation();
});

function addBookMark() {
  if (validation(inputName) && validation(inputURL)) {
    var bookMark = {
      siteName: inputName.value,
      siteURL: inputURL.value,
    };
    bookMarkList.push(bookMark);
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
    clearInput();
    display();
  } else {
    lightBoxContainer.classList.replace("d-none", "d-flex");
  }
}

function clearInput() {
  inputName.value = null;
  inputURL.value = null;
}

function display() {
  var cartona = ``;
  for (var i = 0; i < bookMarkList.length; i++) {
    cartona += `
    <tr>
        <td>${i + 1}</td>
        <td>${bookMarkList[i].siteName}</td>
        <td>
            <a id="btnVisit" href="${
              bookMarkList[i].siteURL
            }" target="_blank" class="btn btn-visit"><i
                    class="fa-solid fa-eye"></i>
                Visit</a>
        </td>
        <td>
            <button id="btnDelete" type="button" onclick="deleteMarkBook(${i});" class="btn btn-delete"><i
                    class="fa-solid fa-trash-can"></i>
                Delete</button>
        </td>
    </tr>
`;
  }
  tableContent.innerHTML = cartona;
}

function deleteMarkBook(indexMarkBook) {
  bookMarkList.splice(indexMarkBook, 1);
  localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
  display();
}

function validation(element) {
  var regex = {
    inputName: /^\w{3,}(\s+\w+)*$/,
    inputURL: /^(https:\/\/|http:\/\/).*$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
