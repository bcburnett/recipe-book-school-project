export default function doForm() {
  tinymce.init({ selector: "#postContent" });
  const postText = document.querySelector("#postText"),
    postLink = document.querySelector("#postLink"),
    postTitle = document.querySelector("#postTitle"),
    postImage = document.querySelector("#postImage"),
    postContent = document.querySelector("#postContent"),
    postSubmit = document.querySelector("#postSubmit"),
    postDisplay = document.querySelector("#postDisplay"),
    postFormDiv = document.querySelector("#postFormDiv")

  postImage.onchange = e => readURL(postImage);

  postSubmit.onclick = (e)=>{
    const responseObject={
      "text":postText.value,
      "link":postLink.value,
      "title": postTitle.value,
      "image":postDisplay.getAttribute('src'),
      "content":tinymce.activeEditor.getContent()
    }

    console.log(responseObject)
    postFormDiv.innerHTML = ''

  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        postDisplay.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
