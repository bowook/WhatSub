package com.whatsub.presentation.controller;

import com.whatsub.application.SubscribeService;
import com.whatsub.domain.Subscribe;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.presentation.dto.SubscribeList;
import com.whatsub.presentation.dto.SubscribeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class SubscribeController {
    private final SubscribeService subscribeService;

    @PostMapping(value = "/subscribe/new")
    public ResponseEntity<SubscribeResponse> createSub(@RequestBody CreateSubscribeRequest request) {
        Subscribe subscribe = subscribeService.createSubscribe(request);

        SubscribeResponse response = new SubscribeResponse(
                subscribe.getId(),
                subscribe.getSubName(),
                subscribe.getSubscribeCategory(),
                subscribe.getPriceType(),
                subscribe.getPrice(),
                subscribe.getSubscribeCycle(),
                subscribe.getDate().toLocalDate(), // LocalDateTime이면 이렇게 가공
                subscribe.getNtoShare()
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/subscribe/view")
    public ResponseEntity<List<SubscribeList>> subscribeList(@RequestParam Long memberId) {
        return ResponseEntity.ok(subscribeService.subscribeList(memberId));
    }
}
