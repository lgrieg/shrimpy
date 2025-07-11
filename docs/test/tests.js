describe('parseExcel', function() {
    it('парсит fake.xlsx', async function() {
      const res = await fetch('mocks/fake.xlsx');
      const blob = await res.blob();
      const file = new File([blob], 'fake.xlsx');
      let output = null;
      await parseExcel(file, d => output = d);
      chai.expect(output).to.be.an('array').and.have.length.greaterThan(0);
      chai.expect(output[0]).to.have.property('Упражнение');
    });
  });
  
  describe('displayProgram', function() {
    it('отображает DOM элементы', function() {
      const div = document.createElement('div');
      div.id = 'program';
      document.body.appendChild(div);
      const mock = [{ 'Неделя':1,'День':'Пн','Упражнение':'A','Подходы':1,'Повторы':1,'Вес (кг)':10}];
      displayProgram(mock);
      chai.expect(div.querySelectorAll('h2').length).to.be.greaterThan(0);
      chai.expect(div.querySelectorAll('input').length).to.be.greaterThan(0);
    });
  });
  