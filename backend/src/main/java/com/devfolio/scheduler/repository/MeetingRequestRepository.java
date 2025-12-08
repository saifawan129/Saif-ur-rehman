package com.devfolio.scheduler.repository;

import com.devfolio.scheduler.model.MeetingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRequestRepository extends JpaRepository<MeetingRequest, Long> {
}
