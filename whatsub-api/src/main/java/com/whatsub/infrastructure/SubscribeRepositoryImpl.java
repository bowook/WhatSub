package com.whatsub.infrastructure;

import com.whatsub.domain.Subscribe;
import com.whatsub.domain.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class SubscribeRepositoryImpl implements SubscribeRepository {
    private final SubscribeJpaRepository subscribeJpaRepository;

    @Override
    public List<Subscribe> findAllByMemberId(Long memberId) {
        return subscribeJpaRepository.findAllByMemberId(memberId);
    }

    @Override
    public Subscribe save(Subscribe subscribe) {
        return subscribeJpaRepository.save(subscribe);
    }

    @Override
    public Optional<Subscribe> findById(Long id) {
        return subscribeJpaRepository.findById(id);
    }

    @Override
    public void delete(Subscribe subscribe) {
        subscribeJpaRepository.delete(subscribe);
    }
}
