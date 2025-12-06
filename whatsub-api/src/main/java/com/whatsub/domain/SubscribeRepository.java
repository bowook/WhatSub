package com.whatsub.domain;

import java.util.List;

public interface SubscribeRepository {
    List<Subscribe> findAllSubscribe(Long memberId);
}
