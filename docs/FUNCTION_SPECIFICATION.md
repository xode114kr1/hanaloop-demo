# Carbon Emissions Dashboard 기능 명세서

## 개요

기업의 탄소 배출량 데이터를 시각적으로 확인할 수 있는 대시보드 서비스이다.

사용자는 회사를 선택한 후 탄소 배출 현황, Scope별 배출량, 관련 게시글(Post), PCF 라이프사이클 정보를 확인할 수 있다.

---

# 1. 회사 검색

## 설명

사용자가 회사를 검색하고 선택할 수 있다.

## 기능

- 회사명 검색 가능
- 검색 결과를 드롭다운 형태로 표시
- 동일한 이름의 회사가 여러 개 존재할 경우 모두 표시
- 마우스 클릭 또는 Enter로 선택 가능

## 결과

- 선택된 회사가 현재 활성 회사가 된다.
- 대시보드 데이터가 해당 회사 기준으로 변경된다.

---

# 2. 대시보드

## 설명

선택된 회사의 주요 탄소 배출 정보를 제공한다.

## 표시 정보

- Total Emissions
- Monthly Change
- Highest Emission Scope
- Estimated Carbon Tax

---

# 3. GHG 배출량 차트

## 설명

탄소 배출량을 차트 형태로 표시한다.

## 기능

### 기간 선택

- Monthly
- Yearly

### Scope 선택

- All
- Scope 1
- Scope 2
- Scope 3

## 결과

선택된 조건에 맞는 배출량 데이터 표시

---

# 4. Post 목록

## 설명

선택된 회사와 연결된 게시글을 확인할 수 있다.

## 기능

- 제목 표시
- 작성일 표시
- 내용 미리보기 표시
- 긴 내용은 ... 처리

## 상세 보기

Post 클릭 시

- Modal 표시
- 전체 제목 표시
- 전체 내용 표시
- 작성일 표시

---

# 5. PCF Lifecycle

## 설명

제품 탄소발자국(PCF) 라이프사이클 정보를 표시한다.

## 기능

- 가로 슬라이더 형태 제공
- 좌우 이동 가능

## 표시 정보

- Stage Name
- Emissions
- Description

## 순서

- Raw Material
- Manufacturing
- Packaging
- Transportation
- Use
- End of Life

---

# 6. Loading 상태

## 설명

데이터 조회 중 사용자에게 로딩 상태를 제공한다.

## 기능

- Skeleton UI 표시

---

# 7. Error 상태

## 설명

API 요청 실패 시 에러 상태를 제공한다.

## 기능

- 에러 메시지 표시
- Retry 버튼 표시

---

# 8. 반응형 UI

## Desktop

- Sidebar 고정
- Dashboard 전체 표시

## Tablet

- Sidebar 축소

## Mobile

- Drawer 형태 Sidebar
- 카드 및 차트 세로 배치

---

# 데이터 가정

원본 과제 데이터에는 Scope 및 PCF Lifecycle 정보가 존재하지 않는다.

대시보드 구현을 위해 Mock Data에 아래 필드를 추가하여 사용한다.

- scope
- productName
- stageName
- stageOrder

source 값만으로 Scope를 판단하지 않는다.
