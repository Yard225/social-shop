describe('Feature: Add Item to cart', () => {
  let repository: InMemoryOrderRepository;
  let usecase: AddItemToCartUseCase;

  beforeEach(() => {
    repository = new InMemoryOrderRepository();
    usecase = new AddItemToCartUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    it('Should add a SKU with quantity 1 to a new order', async () => {});
  });
  afterEach(async () => {});
});
