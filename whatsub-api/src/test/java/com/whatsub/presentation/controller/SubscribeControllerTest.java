package com.whatsub.presentation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsub.application.SubscribeService;
import com.whatsub.domain.Subscribe;
import com.whatsub.domain.SubscribeCategory;
import com.whatsub.domain.SubscribeCycle;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.presentation.dto.SubscribeList;
import com.whatsub.support.SubscribeEntityFixtures;
import com.whatsub.support.SubscribeFixtures;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = SubscribeController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class
)
class SubscribeControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
    }

    @MockitoBean
    SubscribeService subscribeService;

    @Test
    void createSub_returns201_andCallsService() throws Exception {
        //given
        CreateSubscribeRequest request = SubscribeFixtures.기본_구독_요청_KRW();
        Subscribe created = SubscribeEntityFixtures.넷플릭스();

        when(subscribeService.createSubscribe(any(CreateSubscribeRequest.class)))
                .thenReturn(created);

        // when & then
        mockMvc.perform(post("/api/subscribes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(subscribeService).createSubscribe(any(CreateSubscribeRequest.class));
    }

    @Test
    void editSub_returns200_andCallsService() throws Exception {
        // given
        Long id = 1L;
        CreateSubscribeRequest request = SubscribeFixtures.수정_구독_요청_KRW();
        Subscribe edited = SubscribeEntityFixtures.디즈니();

        when(subscribeService.editSubscribe(eq(id), any(CreateSubscribeRequest.class)))
                .thenReturn(edited);

        // when & then
        mockMvc.perform(put("/api/subscribes/{id}", id)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(subscribeService).editSubscribe(eq(id), any(CreateSubscribeRequest.class));
    }

    @Test
    void subscribeList_returns200_andCallsService() throws Exception {
        // given
        Long memberId = 1L;

        List<SubscribeList> list = List.of(
                new SubscribeList("넷플릭스", SubscribeCategory.OTT, 15000.0,  SubscribeCycle.MONTH, LocalDate.now()),
                new SubscribeList("디즈니플러스", SubscribeCategory.OTT, 9900.0, SubscribeCycle.MONTH, LocalDate.now())
        );

        when(subscribeService.subscribeList(memberId)).thenReturn(list);

        // when & then
        mockMvc.perform(get("/api/subscribes", 999L)
                        .param("memberId", memberId.toString()))
                .andExpect(status().isOk());

        verify(subscribeService).subscribeList(memberId);
    }
}