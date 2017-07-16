import { Form1Page } from './app.po';

describe('form1 App', () => {
  let page: Form1Page;

  beforeEach(() => {
    page = new Form1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
