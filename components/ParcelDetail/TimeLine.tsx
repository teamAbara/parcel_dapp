import { Timeline, Text } from "@mantine/core";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
} from "@tabler/icons-react";
//타임라인 사용
export function TimeLine(props: any) {
  const { num } = props;
  return (
    <Timeline active={Number(num) - 1} bulletSize={24} lineWidth={2}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title="집화처리">
        <Text color="dimmed" size="sm">
          고객님의 상품이 분류 중입니다.
        </Text>
      </Timeline.Item>
      <Timeline.Item bullet={<IconGitCommit size={12} />} title="간선상차">
        <Text color="dimmed" size="sm">
          고객님의 상품이 허브로 이동중입니다
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title="간선 하차"
        bullet={<IconGitPullRequest size={12} />}
        lineVariant="dashed"
      >
        <Text color="dimmed" size="sm">
          고객님의 상품이 목적지로 이동 준비중 입니다.
        </Text>
      </Timeline.Item>

      <Timeline.Item title="배송 출고" bullet={<IconMessageDots size={12} />}>
        <Text color="dimmed" size="sm">
          <Text variant="link" component="span" inherit>
            고객님의 상품이 목적지로 출발하였습니다.
          </Text>{" "}
        </Text>
      </Timeline.Item>
      <Timeline.Item title="배송 완료" bullet={<IconMessageDots size={12} />}>
        <Text color="dimmed" size="sm">
          <Text variant="link" component="span" inherit>
            고객님의 상품이 도착하였습니다.
          </Text>
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
