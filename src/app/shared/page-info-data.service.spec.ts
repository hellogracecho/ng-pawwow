import { TestBed } from "@angular/core/testing";

import { PageInfoDataService } from "../services/page-info-data.service";

describe("PageInfoDataService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PageInfoDataService = TestBed.get(PageInfoDataService);
    expect(service).toBeTruthy();
  });
});
