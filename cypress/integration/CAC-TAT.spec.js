/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {

    this.beforeEach(() => cy.visit('./src/index.html'))

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste,Teste, teste, teste, Teste, teste, teste'

        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Joaquina')
        cy.get('#email').type('mariajoaquina@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) //delay 0 escreve o texto todo de uma vez só
        cy.get('button[type="submit"]').click() //usando outro tipo de mapeamento do button
        
        cy.get('.success > strong') // o '.' significa q é uma classe
            .should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('José')
        cy.get('#email').type('#+.!@email.com')
        cy.get('#open-text-area').type('Envio de formulário com email inválido.', {delay: 50})
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdfghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario',
        function(){
            cy.get('#firstName').type('José')
            cy.get('#lastName').type('Marcos')
            cy.get('#email').type('josemarcos@email.com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('Enviando o formulário sem o telefone.')
            cy.contains('button[type="submit"]', 'Enviar').click()
            cy.get('.error').should('be.visible')
        })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Luiz', {delay: 30})
            .should('have.value', 'Luiz')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Carlos', {delay: 30})
            .should('have.value', 'Carlos')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('luiz123@email.com', {delay: 30})
            .should('have.value', 'luiz123@email.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('62998633215')
            .should('have.value', '62998633215')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', 
        function(){
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', 
        function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor(value)', function(){
        const mentoria = 'mentoria'; 
        cy.get('#product').select(mentoria).should('have.value', mentoria)
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento e valida seus valores', function(){
        cy.get('input[type="radio"]').first().check().should('be.checked').and('have.value', 'ajuda')
        cy.get('input[type="radio"]').check('elogio').should('be.checked').and('have.value', 'elogio')
        cy.get('input[type="radio"]').last().check('feedback').should('be.checked').and('have.value', 'feedback')   

    })

    it('marca cada tipo de atendimento iterando sobre eles', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($elementos) {
                cy.wrap($elementos).check()
                cy.wrap($elementos).should('be.checked')
            })
    })


    it.only('Marca todas as opções checkbox e desmarca a última', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

  
})