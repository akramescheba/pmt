import { AppComponent } from './app.component';

describe('AppComponent', ()=>{
  let fixture: AppComponent;
  beforeEach( () => {
    fixture = new AppComponent();
  })

  it('should have title', ()=>{
    expect(fixture.title).toEqual('app');
  });

})