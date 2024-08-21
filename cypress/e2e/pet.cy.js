// Bibliotecas
import pet from '../fixtures/pet.json'
import put from '../fixtures/put.json'
import listaPets from '../fixtures/listaPets.json'

describe('CRUD da entidade Pet ', () => {

  // Post Pet
  it('Post Pet', () => {
    cy.request({
      method: 'POST', // Note que o método HTTP deve ser maiúsculo
      url: '/pet/', // endpoint
      body: pet
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.id).to.eq(pet.id);
      expect(body.name).to.eq(pet.name);
      expect(body.category.id).to.eq(pet.category.id);
      expect(body.category.name).to.eq(pet.category.name);
      expect(body.tags[0].id).to.eq(pet.tags[0].id);
      expect(body.tags[0].name).to.eq(pet.tags[0].name);
      expect(body.status).to.eq(pet.status);
    })
  }) // Termina Post

  // Get Pet
  it('Get Pet', () => {
    cy.request({
      method: 'GET', // Note que o método HTTP deve ser maiúsculo
      url: `/pet/${pet.id}`, // endpoint
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.id).to.eq(pet.id);
      expect(body.name).to.eq(pet.name);
      expect(body.category.id).to.eq(pet.category.id);
      expect(body.category.name).to.eq(pet.category.name);
      expect(body.tags[0].id).to.eq(pet.tags[0].id);
      expect(body.tags[0].name).to.eq(pet.tags[0].name);
      expect(body.status).to.eq(pet.status);
    })
  })

  // Put Pet
  it('Put Pet', () => {
    cy.request({
      method: 'PUT', // Note que o método HTTP deve ser maiúsculo
      url: '/pet', // endpoint
      body: put
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.id).to.eq(put.id);
      expect(body.name).to.eq(put.name);
      expect(body.category.id).to.eq(put.category.id);
      expect(body.category.name).to.eq(put.category.name);
      expect(body.tags[0].id).to.eq(put.tags[0].id);
      expect(body.tags[0].name).to.eq(put.tags[0].name);
      expect(body.status).to.eq(put.status);
    })
  })

  // Verificar Atualização do Pet
  it('Get Pet Atualizado', () => {
    cy.request({
      method: 'GET',
      url: `/pet/${put.id}`, // endpoint para obter o pet atualizado
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.id).to.eq(put.id);
      expect(body.name).to.eq(put.name);
      expect(body.category.id).to.eq(put.category.id);
      expect(body.category.name).to.eq(put.category.name);
      expect(body.tags[0].id).to.eq(put.tags[0].id);
      expect(body.tags[0].name).to.eq(put.tags[0].name);
      expect(body.status).to.eq(put.status);
    })
  }) // Termina Verifica o Pet Alterado


  // Delete Pet
  it('Delete Pet', () => {
    cy.request({
      method: 'DELETE',
      url: `/pet/${pet.id}` // endpoint para deletar o pet
    }).then(({ status, body }) => {
      expect(status).to.eq(200) // status code --> comunicacao com API

      // Adicionar logs para depuração
      console.log('DELETE body:', body);
      expect(body.code).to.eq(200); // process code --> processamento na API
      expect(body.type).to.eq('unknown') // tipo desconhecido - padrão
      expect(body.message).to.eq(`${pet.id}`) // código do animal que foi excluido
      // Verificar se o pet foi realmente excluído (opcional)
      cy.request({
        method: 'GET',
        url: `/pet/${pet.id}`,
        failOnStatusCode: false // Não falhe o teste se a solicitação GET retornar um erro
      }).then((response) => {
        console.log('GET After DELETE Response:', response);
        expect(response.status).to.eq(404); // O pet deve retornar um erro 404 (não encontrado) após a exclusão
      })// termina o delete
    })
  })

  listaPets.forEach(element => {
    it(`Post Pet Data Driven - ${element.name}`, () => {
      cy.request({
        method: 'POST',     // Note que o método HTTP deve ser maiúsculo
        url: '/pet/',      // endpoint
        body: element
      }).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.id).to.eq(element.id);
        expect(body.name).to.eq(element.name);
        expect(body.category.id).to.eq(element.category.id);
        expect(body.category.name).to.eq(element.category.name);
        expect(body.tags[0].id).to.eq(element.tags[0].id);
        expect(body.tags[0].name).to.eq(element.tags[0].name);
        expect(body.status).to.eq(element.status);
      })
    }) // Termina Post data driven
  })
})// termina o describe