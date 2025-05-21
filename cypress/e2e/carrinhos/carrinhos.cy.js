import {
  login,
  cadastrarCarrinhoComToken,
  listarCarrinhos,
  buscarCarrinhoPorId,
  removerCarrinho
} from "../../support/apiHelper.js";

describe("Testes de API - Carrinhos (Serverest)", () => {
  let token = "";

  before(() => {
    login("fulano@qa.com", "teste").then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.authorization;
    });
  });

  it("Deve cadastrar um novo carrinho", () => {
    const novoCarrinho = {
      produtos: [{ idProduto: "BeeJh5lz3k6kSIzA", quantidade: 1 }]
    };

    cadastrarCarrinhoComToken(novoCarrinho, token).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("message").and.contains("Cadastro realizado com sucesso");
    });
  });

  it("Deve listar todos os carrinhos cadastrados", () => {
    listarCarrinhos().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("quantidade");
      expect(res.body).to.have.property("carrinhos");
      expect(res.body.carrinhos).to.be.an("array");
    });
  });

  it("Deve buscar um carrinho por ID", () => {
    listarCarrinhos().then((res) => {
      const id = res.body.carrinhos[0]._id;

      buscarCarrinhoPorId(id).then((resBusca) => {
        expect(resBusca.status).to.eq(200);
        expect(resBusca.body).to.have.property("idUsuario");
        expect(resBusca.body).to.have.property("produtos");
      });
    });
  });

  it("Deve remover um carrinho por ID", () => {
    listarCarrinhos().then((res) => {
      const id = res.body.carrinhos[0]._id;

      removerCarrinho(id).then((resRemocao) => {
        expect([200, 204]).to.include(resRemocao.status);
      });
    });
  });
});