/* **********menu******* */
//para el menu de navegacionse creara una funcion autoejecutable para aparecer y desaparecer el menu desplegable
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  //para programar el evento al boton click
  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/*******ContactFrom*********/

((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");
  //vamos a asignar el evento submit al formulario.
  $form.addEventListener("submit", (e) => {
    e.preventDefault(); //para evitar que el formulario se envie, se aplica el default para controlar por ajax
    $loader.classList.remove("none"); //con esto el elemento loader se le va a quitar la classe none, con esto el loader se empezara a ver.
    fetch("https://formsubmit.co/ajax/782dae4c2bdb3f306e970705a02e0806", {
      method: "POST",
      /*  headers: {
        "Content-Type": "application/json",
        acept: "application/json",
      }, */ //el envio se debe hacer por metodo post
      body: new FormData(e.target), //se especifica cual es la informacion que se enviara(el formulario como tal), se declara una variable de tipo form data para que serialice los datos y se lo envie a la petición del servicio que se utiliza.  los datos se obtienen del e.target el cual es el objeto que origina el event(formulario)
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res))) //si la respuesta valida verdadero, entonces el formsubmit, convierta la informacion en json, de lo contrario rechasa la promesa para que el error lo manipule hacia el catch
      .then((json) => {
        console.log(json);
        $loader.classList.add("none");
        location.hash = "#gracias"; //para modificar la parte del hash agregando el texto #gracias, para activar la ventana modal
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "ocurrio un error al enviar, intenta nuevamente"; //si err.statustext no existe, entonces se envia el mensaje personalizado
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}:${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);
