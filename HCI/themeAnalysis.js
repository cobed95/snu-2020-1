const rawCodes = '깡 유머,커뮤니티,시사/이슈,작품 비판,일상적 깡,주객전도,깡의 중독성,타임스탬프,김태희,소속감 제고,최근 방송 출연,커뮤니티 스케일,비의 인품,커뮤니티 성격,비 보호,자발적 참여,깡 예찬,노래 분석,농심,댓글 알림,시사 이슈,유머,작품 내용,타 작품,본인 근황,불만,아스키아트,엄복동,유노윤호,일상,자기 비판,커뮤니티 용어';

const codes = rawCodes.split(',');
const rawGroups = [1,2,1,1,1,1,3,2,1,2,2,2,4,2,4,2,3,1,1,2,2,1,1,2,2,1,1,1,1,1,2,2];
const groups = (groupId) => {
    throw new Error(`undefined groupId: ${groupId}`);
}

const defineNewGroup = (getGroupName, newGroupId, newGroupName) => (groupId) => {
    if (newGroupId === groupId)
        return newGroupName;
    else
        return getGroupName(newGroupId);
};

const groups1 = defineNewGroup(groups, 1, '작품 비판');
console.log(groups1(1));
const groups2 = defineNewGroup(groups1, 2, '커뮤니티');
const groups3 = defineNewGroup(groups2, 3, '작품 옹호');
const groups4 = defineNewGroup(groups3, 4, '작가 옹호');
console.log(groups4(1));

const getGroupName = groupId => {
    switch (groupId) {
        case 1:
            return '작품 비판';
        case 2:
            return '커뮤니티';
        case 3:
            return '작품 옹호';
        case 4:
            return '작가 옹호';
        default:
            throw new Error(`undefined groupId ${groupId}`);
    }
};

const codesWithGroups = codes.map((str, i) => ({ codeName: str, groupName: getGroupName(rawGroups[i]) }));

const logGroup = (groupId) => {
    console.log(
        getGroupName(groupId),
        codesWithGroups
            .filter(el => el.groupName === getGroupName(groupId))
            .map(el => el.codeName)
    );
};

Array(4).fill(0).map((x, i) => i + 1).forEach(i => { logGroup(i) });
