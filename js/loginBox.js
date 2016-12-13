var LoginBox = React.createClass({

    enviarPeticion: function(){
      console.log(this.campoPass.value);
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
                user: this.campoUser.value,
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
              window.location = "/perfil";
            }else{
              var msgLogin = document.getElementById("msgLogin");
              msgLogin.style = "text-align: center;background-color: #f03737cc;padding: 2px;border-radius: 5px;margin-bottom: 10px;";
              msgLogin.innerHTML = body;
            }
          })
    },

    render: function() {
        return <div id="login-content">
               <div id="msgLogin"></div>
                <fieldset id="inputs">
                  <input className="loginBoxInput" ref={(campo)=>{this.campoUser=campo}} placeholder="Tu usuario" required=""></input>   
                  <input className="loginBoxInput" ref={(campo)=>{this.campoPass=campo}} required="" type="password"></input>
                </fieldset>
                <fieldset id="actions">
                  <input id="submit" onClick={this.enviarPeticion} className="loginBoxSubmit" value="Iniciar sesión" type="button"></input>
                </fieldset>
            </div>;
    }
});


ReactDOM.render(
    <LoginBox/>, document.getElementById('loginBox')
);