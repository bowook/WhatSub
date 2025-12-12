package com.whatsub.domain;

import java.util.List;
import java.util.Optional;

public interface SubscribeRepository {
    List<Subscribe> findAllByMemberId(Long memberId);

    Subscribe save(Subscribe subscribe);

    Optional<Subscribe> findById(Long id);

    void delete(Subscribe subscribe);
}
