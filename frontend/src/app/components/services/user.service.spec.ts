import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { UserService, User } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    nom: "Jean Dupont",
    email: "jean@example.com",
  };

  const mockUsers: User[] = [
    { id: 1, nom: "Alice", email: "alice@example.com" },
    { id: 2, nom: "Bob", email: "bob@example.com" },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should fetch all users with getAllUsers()", () => {
    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });
    const req = httpMock.expectOne("http://localhost:8081/utilisateur");
    expect(req.request.method).toBe("GET");
    req.flush(mockUsers);
  });

  it("should fetch user by ID with getUserById(id)", () => {
    const userId = 1;

    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `http://localhost:8081/utilisateur/${userId}`
    );
    expect(req.request.method).toBe("GET");

    req.flush(mockUser);
  });

  it("should fetch current user with getCurrentUser()", () => {
    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne("http://localhost:8081/utilisateur/me");
    expect(req.request.method).toBe("GET");

    req.flush(mockUser);
  });
});
