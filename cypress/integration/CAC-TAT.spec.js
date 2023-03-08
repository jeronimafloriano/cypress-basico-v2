/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(() => cy.visit('./src/index.html'))

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = Cypress._.repeat('Teste ', 50)

        cy.clock()

        cy.get('#firstName').type('Maria', { delay: 20})
        cy.get('#lastName').type('Joaquina')
        cy.get('#email').type('mariajoaquina@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) //delay 0 escreve o texto todo de uma vez só
        cy.get('button[type="submit"]').click() //usando outro tipo de mapeamento do button
        cy.get('.success') // o '.' significa q é uma classe
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('José')
        cy.get('#email').type('#+.!@email.com')
        cy.get('#open-text-area').type('Envio de formulário com email inválido.', {delay: 30})
        cy.clock()
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')


    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdfghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario',
        function(){
            cy.clock()

            cy.get('#firstName').type('José')
            cy.get('#lastName').type('Marcos')
            cy.get('#email').type('josemarcos@email.com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('Enviando o formulário sem o telefone.')    
            cy.contains('button[type="submit"]', 'Enviar').click()
            cy.get('.error').should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Luiz')
            .should('have.value', 'Luiz')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Carlos')
            .should('have.value', 'Carlos')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('luiz123@email.com')
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
            cy.clock()

            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(3, () => {
        it('envia o formuário com sucesso usando um comando customizado', function(){
            cy.clock()
    
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible')
    
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })
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


    it('Marca todas as opções checkbox e desmarca a última', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')  
            .should(($input) => {
                expect($input[0].files[0].name).to.eq('example.json')
            })                
    })


    it('seleciona um arquivo simulando um drag-and-drop', function(){  
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}) 
            .should(function($input) {
                expect($input[0].files[0].name).to.eq('example.json')
            })      
            
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('myFile') //cy.fixture busca as fixture
        cy.get('input[type=file]')
            .selectFile('@myFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.eq('example.json')
            })              
            
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link e validando o título', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            .then(()  => {
                cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
                cy.contains('Talking About Testing').should('be.visible')
            })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')

        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('Teste ', 50)
        cy.get('#open-text-area').invoke('val' , longText).should('have.value', longText)
    })

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((response) => {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT');
            })
    })

    it('Desafio: encontre o gato escondido', function() {
        cy.get('#cat').invoke('show').should('be.visible')
    })

    it('alterando informações da página', function() {
        cy.get('#title').invoke('text', 'CAT TAT')
        cy.get('#subtitle').invoke('text', 'Praticando automação com Cypress!!!! ❤️❤️❤️')
    })

})