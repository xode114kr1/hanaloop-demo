import type { Post } from "@/types/post";

export const mockPosts: Post[] = [
  {
    id: "post-001",
    title: "EU 수출 건의 CBAM 보고 범위 확대",
    resourceUid: "company-001",
    dateTime: "2024-03-12T09:30:00.000Z",
    content:
      "하나루프 소재는 다음 보고 주기부터 EU향 출하 물량 전체에 대해 협력사 단위 배출 증빙을 포함합니다.",
  },
  {
    id: "post-002",
    title: "재생에너지 전력 계약 갱신",
    resourceUid: "company-001",
    dateTime: "2024-03-08T14:00:00.000Z",
    content:
      "국내 핵심 제조 시설에 적용되는 장기 재생에너지 전력 구매 계약을 갱신했습니다.",
  },
  {
    id: "post-003",
    title: "전기 배송 차량 전환 목표 일부 달성",
    resourceUid: "company-002",
    dateTime: "2024-03-04T11:20:00.000Z",
    content:
      "그린프레이트 시스템즈는 1분기 동안 권역 배송 차량의 42%를 전기 차량으로 전환했습니다.",
  },
  {
    id: "post-004",
    title: "협력사 점검으로 Scope 3 감축 과제 도출",
    resourceUid: "company-003",
    dateTime: "2024-02-27T16:10:00.000Z",
    content:
      "에코포지 전자는 협력사 점검을 완료하고 부품 조달 단계 배출량 감축을 위한 우선 과제를 도출했습니다.",
  },
];
