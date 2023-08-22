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
          You&apos;ve created new branch{" "}
          <Text variant="link" component="span" inherit>
            fix-notifications
          </Text>{" "}
          from master
        </Text>
        <Text size="xs" mt={4}>
          2 hours ago
        </Text>
      </Timeline.Item>

      <Timeline.Item bullet={<IconGitCommit size={12} />} title="간선상차">
        <Text color="dimmed" size="sm">
          You&apos;ve pushed 23 commits to
          <Text variant="link" component="span" inherit>
            fix-notifications branch
          </Text>
        </Text>
        <Text size="xs" mt={4}>
          52 minutes ago
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title="간선 하차"
        bullet={<IconGitPullRequest size={12} />}
        lineVariant="dashed"
      >
        <Text color="dimmed" size="sm">
          You&apos;ve submitted a pull request
          <Text variant="link" component="span" inherit>
            Fix incorrect notification message (#187)
          </Text>
        </Text>
        <Text size="xs" mt={4}>
          34 minutes ago
        </Text>
      </Timeline.Item>

      <Timeline.Item title="배송 출고" bullet={<IconMessageDots size={12} />}>
        <Text color="dimmed" size="sm">
          <Text variant="link" component="span" inherit>
            Robert Gluesticker
          </Text>{" "}
          left a code review on your pull request
        </Text>
        <Text size="xs" mt={4}>
          12 minutes ago
        </Text>
      </Timeline.Item>
      <Timeline.Item title="배송 완료" bullet={<IconMessageDots size={12} />}>
        <Text color="dimmed" size="sm">
          <Text variant="link" component="span" inherit>
            Robert Gluesticker
          </Text>{" "}
          left a code review on your pull request
        </Text>
        <Text size="xs" mt={4}>
          12 minutes ago
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
