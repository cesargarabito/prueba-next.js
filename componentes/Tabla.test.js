
import { getUsers } from "./firebaseConfig.js";
describe("getUsers", () => {
  it("debería devolver una lista de usuarios", async () => {
   
    const users = [
      { id: "1", name: "Usuario 1" },
      { id: "2", name: "Usuario 2" },
      { id: "3", name: "Usuario 3" },
    ];

    
    const collection = jest.fn().mockReturnValue({
      docs: users.map((user) => ({ id: user.id, data: () => user })),
    });
    const getDocs = jest.fn().mockResolvedValue({
      docs: users.map((user) => ({ id: user.id, data: () => user })),
    });

    
    const result = await getUsers(collection, getDocs);

    
    expect(result).toEqual(users);

 
    expect(collection).toHaveBeenCalledWith(db, "users");
    expect(getDocs).toHaveBeenCalledWith(usersCol);
  });
});
