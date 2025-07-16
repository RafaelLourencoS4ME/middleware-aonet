module.exports = { dadosAninhados, dadosAninhadosObject }

function dadosAninhados(dados) {
  const dadosAninhados = dados.map(contrato => {

    const dadosBase = { ...contrato };

    const keys = Object.keys(dadosBase);

    keys.forEach(key => {

      if (dadosBase[key] === null) {
        dadosBase[key] = "null";
      }

      if (Array.isArray(dadosBase[key]) && dadosBase[key].length > 0) {
        dadosBase[key] = dadosBase[key].map(item =>
        JSON.stringify(item)).join(' | ');
      }

      if (Array.isArray(dadosBase[key]) && dadosBase[key].length === 0) {
        dadosBase[key] = "";
      }
    });

    return dadosBase;
  });

  return {"data": dadosAninhados}
}

function dadosAninhadosObject(dados) {
  const keys = Object.keys(dados);

  keys.forEach(key => {
    if (dados[key] === null) {
      dados[key] = "null";
    }

    if (Array.isArray(dados[key]) && dados[key].length > 0) {
      dados[key].forEach(dado => {
        const subObjectkeys = Object.keys(dado);

        subObjectkeys.forEach(subKey => {
          if (dado[subKey] === null) {
            dado[subKey] = "null";
          }

          if (Array.isArray(dado[subKey]) && dado[subKey].length > 0) {
            dado[subKey] = dado[subKey].map(item => JSON.stringify(item)).join(' | ');
          }
            
          if (Array.isArray(dado[subKey]) && dado[subKey].length === 0) {
            dado[subKey] = "";
          }
        })
      });
    }
    else if (Array.isArray(dados[key]) && dados[key].length === 0) {
      dados[key] = "";
    }
    else if(typeof dados[key] === 'object' && !Array.isArray(dados[key])){
      const subObjectkeys = Object.keys(dados[key]);

      subObjectkeys.forEach(subKey => {
        if (dados[key][subKey] === null) {
          dados[key][subKey] = "null";
        }

        if (Array.isArray(dados[key][subKey]) && dados[key][subKey].length > 0) {
          dados[key][subKey] = dados[key][subKey].map(item => JSON.stringify(item)).join(' | ');
        }
          
        if (Array.isArray(dados[key][subKey]) && dados[key][subKey].length === 0) {
          dados[key][subKey] = "";
        }
      });
    }
  });

  return dados
}