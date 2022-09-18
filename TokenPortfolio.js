class TokenPortfolio {
  constructor(name) {
    this.name = name;
  }

  let instance = {};

  return {
    getInstance: function(){
      if (!instance) {
        instance = new SingletonClass();
        delete instance.constructor;
      }
      return instance;
    }
  };
}

