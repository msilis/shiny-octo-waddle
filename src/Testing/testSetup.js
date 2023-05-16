import { server } from "./Mocks/server";

//Start server before all tests
beforeAll(()=> server.listen({ onUnhandledRequest: 'error'}));

//Close server after all tests
afterAll(()=> server.close());

//Reset handlers after each test
afterEach(()=> server.resetHandlers())