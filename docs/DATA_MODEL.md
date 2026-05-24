# Data Model

## 개요

본 프로젝트는 과제에서 제공한 데이터 모델을 기반으로 구현한다.

추가 기능(PCF Lifecycle)을 구현하기 위해 Product 및 ProductPcf 데이터를 추가로 정의한다.

---

# 1. Company

회사 정보

```ts
type Company = {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
};
```

설명

| 필드      | 설명             |
| --------- | ---------------- |
| id        | 회사 ID          |
| name      | 회사명           |
| country   | 국가 코드        |
| emissions | 탄소 배출량 목록 |

---

# 2. GhgEmission

탄소 배출량 정보

```ts
type GhgEmission = {
  yearMonth: string;
  source: string;
  scope: GhgScope;
  emissions: number;
};
```

설명

| 필드      | 설명               |
| --------- | ------------------ |
| yearMonth | 배출 연월          |
| source    | 배출원             |
| scope     | Scope 구분         |
| emissions | 탄소 배출량(tCO₂e) |

---

## GhgScope

```ts
type GhgScope = "scope1" | "scope2" | "scope3";
```

설명

| Scope  | 설명                     |
| ------ | ------------------------ |
| scope1 | 직접 배출                |
| scope2 | 구매 전력 사용           |
| scope3 | 공급망 및 기타 간접 배출 |

---

# 3. Post

회사 관련 게시글

```ts
type Post = {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
};
```

설명

| 필드        | 설명        |
| ----------- | ----------- |
| id          | 게시글 ID   |
| title       | 제목        |
| resourceUid | 회사 ID     |
| dateTime    | 작성일      |
| content     | 게시글 내용 |

---

# 4. Product

회사가 보유한 제품 정보

```ts
type Product = {
  id: string;
  companyId: string;
  name: string;
};
```

설명

| 필드      | 설명         |
| --------- | ------------ |
| id        | 제품 ID      |
| companyId | 소속 회사 ID |
| name      | 제품명       |

---

# 5. ProductPcf

제품 탄소발자국(PCF) 정보

```ts
type ProductPcf = {
  id: string;
  productId: string;
  stageName: string;
  stageOrder: number;
  emissions: number;
  description: string;
};
```

설명

| 필드        | 설명                  |
| ----------- | --------------------- |
| id          | PCF 단계 ID           |
| productId   | 제품 ID               |
| stageName   | 단계명                |
| stageOrder  | 표시 순서             |
| emissions   | 해당 단계 탄소 배출량 |
| description | 단계 설명             |

---

## Lifecycle Stage 예시

```text
Raw Material
↓
Manufacturing
↓
Packaging
↓
Transportation
↓
Use
↓
End of Life
```

설명

- stageOrder 기준으로 정렬하여 표시한다.
- PCF Lifecycle 슬라이더는 ProductPcf 데이터를 사용한다.

---

# 데이터 가정

원본 과제 데이터에는 Scope, Product, PCF 정보가 존재하지 않는다.

대시보드 구현을 위해 아래 데이터를 추가로 정의하여 사용한다.

- scope
- Product
- ProductPcf

Scope는 source 값으로 추론하지 않고 별도 필드로 관리한다.
