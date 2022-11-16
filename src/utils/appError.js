class AppError {
  message;
  statusCode;

  //o método constructor é carregado automaticamente quando a classe é instanciada.
  //o método statusCode é opcional, caso ele não seja passado será carregado o "statusCode = 400"
  constructor(message, statusCode = 400) {
    //aqui estamos pegando as informações na função construtora e repassando para as variáveis globais declaradas no início da classe: message, statusCode.
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
