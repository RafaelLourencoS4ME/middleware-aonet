module.exports = { dadosAninhados }

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