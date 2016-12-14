var UploadImage = React.createClass({
         
        uploadImage() {
          var input = document.querySelector('input[type="file"]');
          var submit = document.getElementById("subirImagen");
          var error = document.getElementById("error");
          
          error.innerHTML = '';
          submit.innerHTML = '';
          
          var fileExtension = input.files[0].name.split('.').pop();
          if(fileExtension == 'png'){
            submit.innerHTML = '<input  class="btn btn-primary" type="submit" value="Subir imagen"></input>';
          }
          else{
            error.innerHTML = '<div class="alert alert-dismissible alert-danger">Solo se puede utilizar el formato .png</div>';
          }
          
              
        },
        
        render() {
            return (
              <div>
                  <form action="/images/upload" method="POST" encType="multipart/form-data">
                  <h1><i className="fa fa-cloud-upload" aria-hidden="true"></i> Subir imagen</h1><br></br>
                    <input className="btn btn-default" type='file' name='image' onChange={this.uploadImage}></input><br></br><br></br>
                    <span id="subirImagen"></span>
                  </form>
              </div>
            );
         }
})

ReactDOM.render(<UploadImage/>, document.getElementById('uploadImageBox'));