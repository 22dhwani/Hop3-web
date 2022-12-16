import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { createReaction } from '../services/post';

interface IUsePostLike {
  isLikeByMe: boolean;
  totalLike: number;
  postId: string;
}

const usePostLike = (props: IUsePostLike) => {
  const [isLikeByMe, setIsLikeByMe] = useState(props.isLikeByMe);
  const [totalLikes, setTotalLikes] = useState(props.totalLike);
  const createReactionMutation = useMutation(createReaction);

  const onPressLike = useCallback(() => {
    setIsLikeByMe(true);
    setTotalLikes((prevState: number) => prevState + 1);
    const payload = {
      postId: props.postId,
      reactionData: {
        reaction_type: 'like',
      },
    };
    createReactionMutation.mutate(payload);
  }, [createReactionMutation, props.postId]);

  return { isLikeByMe, onPressLike, totalLikes };
};

export default usePostLike;
