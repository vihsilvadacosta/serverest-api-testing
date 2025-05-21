import {
  login,
  cadastrarCarrinhoComToken,
  listarCarrinhos,
  buscarCarrinhoPorId
} from "../../support/apiHelper.js";

describe("Testes de API - Carrinhos (Serverest)", () => {

  it("Deve cadastrar e remover um carrinho", () => {
    const email = Cypress.env("usuario_email");
    const senha = Cypress.env("usuario_senha");

    login(email, senha).then((resLogin) => {
      expect(resLogin.status).to.eq(200);
      Cypress.env("token", resLogin.body.authorization);

      const token = Cypress.env("token");

      cy.request({
        method: "DELETE",
        url: "https://serverest.dev/carrinhos/cancelar-compra",
        headers: { Authorization: token },
        failOnStatusCode: false
      }).then(() => {
        const novoCarrinho = {
          produtos: [{ idProduto: "BeeJh5lz3k6kSIzA", quantidade: 1 }]
        };

        cadastrarCarrinhoComToken(novoCarrinho, token).then((resCadastro) => {
          expect(resCadastro.status).to.eq(201);

          cy.request({
            method: "DELETE",
            url: "https://serverest.dev/carrinhos/cancelar-compra",
            headers: { Authorization: token },
            failOnStatusCode: false
          }).then((resRemocao) => {
            expect([200, 204, 401]).to.include(resRemocao.status);
          });
        });
      });
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

  it("Deve cadastrar e depois buscar um carrinho por ID", () => {
    const email = Cypress.env("usuario_email");
    const senha = Cypress.env("usuario_senha");

    login(email, senha).then((resLogin) => {
      expect(resLogin.status).to.eq(200);
      Cypress.env("token", resLogin.body.authorization);

      const token = Cypress.env("token");

      cy.request({
        method: "DELETE",
        url: "https://serverest.dev/carrinhos/cancelar-compra",
        headers: { Authorization: token },
        failOnStatusCode: false
      }).then(() => {
        const novoCarrinho = {
          produtos: [{ idProduto: "BeeJh5lz3k6kSIzA", quantidade: 1 }]
        };

        cadastrarCarrinhoComToken(novoCarrinho, token).then((resCadastro) => {
          expect(resCadastro.status).to.eq(201);

          listarCarrinhos().then((resListagem) => {
            const id = resListagem.body.carrinhos[0]._id;

            buscarCarrinhoPorId(id).then((resBusca) => {
              expect(resBusca.status).to.eq(200);
              expect(resBusca.body).to.have.property("idUsuario");
              expect(resBusca.body).to.have.property("produtos");
            });
          });
        });
      });
    });
  });
});
