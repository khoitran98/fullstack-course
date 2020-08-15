describe('Blog app', function() {
    beforeEach(function() {
    //   cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    // it('Login form is shown', function() {
    //     cy.contains('login')
    // })
    // it.only('login fails with wrong password', function() {
    //     cy.get('#username').type('wrong')
    //     cy.get('#password').type('wrong')
    //     cy.get('#login').click()
    //     cy.contains('wrong username or password')
    // })
    // it.only('login success', function() {
    //     cy.get('#username').type('')
    //     cy.get('#password').type('')
    //     cy.get('#login').click()
    //     cy.contains('logged-in')
    // })
    // it('A blog can be created', function() {
    //     cy.get('#username').type('')
    //     cy.get('#password').type('')
    //     cy.get('#login').click()
    //     cy.contains('logged-in')
    //     cy.get('#reveal').click()
    //     cy.get('#title').type('heyheyhye')
    //     cy.get('#author').type('heyheyhye')
    //     cy.get('#url').type('heyheyhye')
    //     cy.get('#createBlog').click()
    //     cy.contains('added')
    // })
    // it('like blog', function() {
    //     cy.get('#username').type('')
    //     cy.get('#password').type('')
    //     cy.get('#login').click()
    //     cy.contains('logged-in')
    //     cy.contains('view').click()
    //     cy.contains('like').click()
    // })
    // it('delete blog', function() {
    //     cy.get('#username').type('')
    //     cy.get('#password').type('')
    //     cy.get('#login').click()
    //     cy.get('#reveal').click()
    //     cy.get('#title').type('dfdfd')
    //     cy.get('#author').type('Khoi Tran')
    //     cy.get('#url').type('heyheyhye')
    //     cy.get('#createBlog').click()
    //     cy.contains('view').click()
    //     cy.contains('remove').click()
    // })
    // it('delete blog', function() {
    //     let array = new Array()
    //     cy.get('.likes').each(like => {
    //         var r = /\d+/
    //         array.push(parseInt(like.text().match(r)[0]))
    //     }).then(() =>{
    //         let i
    //         let prev = 0
    //         for(i = 0; i < array.length; i++)
    //         {
    //             if (array[i] < prev)
    //                 cy.log('not sorted')
    //         } 
    //         cy.log('sorted')
    //     })
    // })
  })