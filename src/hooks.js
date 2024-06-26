import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import * as API from './api';

export function useUser(userId) {
  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: () => API.fetchUser(userId),
    staleTime: Infinity,
  });

  return {
    ...query,
  };
}

export function useUserTags(userId) {
  const query = useQuery({
    queryKey: ['userTags', userId],
    queryFn: () => API.fetchUserTags(userId),
  });

  return {
    ...query,
    remove: useRemoveUserTag(),
    assign: useAssignUserTag(),
  };
}

export function useUserTagMutation(mutationFn) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: (result) => {
      queryClient.invalidateQueries(['userTags', result.uuid]);
    },
  });

  return mutation;
}

export function useRemoveUserTag() {
  return useUserTagMutation(({ userId, tagId }) =>
    API.removeUserTag(userId, tagId)
  );
}

export function useAssignUserTag() {
  return useUserTagMutation(({ userId, tagId }) =>
    API.assignUserTag(userId, tagId)
  );
}

export function useAllTags() {
  const query = useQuery({
    queryKey: ['allTags'],
    queryFn: API.fetchTags,
  });

  return {
    ...query,
    create: useCreateTag(),
  };
}

export function useAllTagMutation(mutationFn) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['allTags']);
    },
  });

  return mutation;
}

export function useCreateTag() {
  return useAllTagMutation((tagName) => API.createTag({ title: tagName }));
}
