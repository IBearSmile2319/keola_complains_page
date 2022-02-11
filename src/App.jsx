import Kaola from './assets/img.png'
import Bisinessman from './assets/Businessman'
import Form from './components/Form'
const App = () => {
  return (
    <div className="complain-page">
      <header className="complain-page__header">
        <nav className="complain-page__wrapper complain-page__container">
          <a href="/" className="complain-page__logo">
            <img src={Kaola} />
          </a>
        </nav>
      </header>
      <main className="complain-page__main complain-page__container">
        <div className="complain-page__Info" >
          <div className="complain-page__Info-title">
            <h1>Libro de reclamaciones virtual</h1>
            <p>
              ¡Hola! Si tienes cualquier consulta o requieres una atención inmediata, te invitamos a usar nuestro canal de atencion:
              <span>TELÉFONO:(01) XXX-XXX-XXX </span>
              Gracias por ayudarnos a mejorar nuestros servicios.
            </p>
          </div>
          <div className="complain-page__Info-img">
            <Bisinessman />
          </div>
        </div>
        {/* formulario */}
        <Form />

      </main>

    </div>
  )
}

export default App
