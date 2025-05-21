const apiBase = "https://serverest.dev";

export function login(email, password) {
  return cy.request({
    method: "POST",
    url: `${apiBase}/login`,
    body: { email, password },
    failOnStatusCode: false
  });
}

export function cadastrarCarrinhoComToken(carrinho, token) {
  return cy.request({
    method: "POST",
    url: `${apiBase}/carrinhos`,
    body: carrinho,
    headers: {
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false
  });
}

export function listarCarrinhos() {
  return cy.request({
    method: "GET",
    url: `${apiBase}/carrinhos`,
    failOnStatusCode: false
  });
}

export function buscarCarrinhoPorId(id) {
  return cy.request({
    method: "GET",
    url: `${apiBase}/carrinhos/${id}`,
    failOnStatusCode: false
  });
}

export function removerCarrinho(id) {
  return cy.request({
    method: "DELETE",
    url: `${apiBase}/carrinhos/${id}`,
    failOnStatusCode: false
  });
}