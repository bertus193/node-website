var LoginBox = React.createClass({
    
    enviarPeticion: function(){
      var user = this.campoUser.value;
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
                user: user,
                pass : this.campoPass.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(res){
            //document.getElementById("editok").innerHTML+="<div class='alert alert-dismissible alert-success'><strong>¡Enhorabuena!</strong> la imagen ha sido editada correctamente</div>";
            return res.text();
          }).then(function(body) {
            if(body == "OK"){
               var loginMenu = document.getElementById("loginMenu");
               loginMenu.innerHTML = "<li><a href='/perfil'>Perfil</a></li><li><a href='/logout'>Cerrar Sesión</a></li><li><a href='/images/upload'>Subir Imágenes</a></li>";
            }else{
              var msgLogin = document.getElementById("msgLogin");
              msgLogin.innerHTML = "<div class='msgLoginDiv'>" + body + "</div>";
            }
          })
    },

    render: function() {
        return <div id="login-content">
               <div id="msgLogin"></div>
                <fieldset id="inputs">
                  <input className="loginBoxInput" ref={(campo)=>{this.campoUser=campo}} placeholder="Usuario" required=""></input>   
                  <input className="loginBoxInput" ref={(campo)=>{this.campoPass=campo}} placeholder="Contraseña" required="" type="password"></input>
                </fieldset>
                <fieldset id="actions">
                  <button id="submit" onClick={this.enviarPeticion} className="loginBoxSubmit">Iniciar sesión</button>
                </fieldset>
            </div>;
    }
});

if(document.getElementById('loginBox')){
ReactDOM.render(
    <LoginBox/>, document.getElementById('loginBox')
);
}