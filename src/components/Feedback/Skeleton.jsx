import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SkeletonBase = styled.div`
  background: #121212;
  background-image: linear-gradient(
    90deg, 
    #121212 0px, 
    #1a1a1a 40px, 
    #121212 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 8px;
`;

const HomeContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionHeader = styled(SkeletonBase)`
  width: 200px;
  height: 32px;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

const CardSkeleton = styled(SkeletonBase)`
  min-width: 180px;
  height: 240px;
  flex-shrink: 0;
`;

const AlbumHeaderSkeleton = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
  align-items: flex-end;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
`;

const AlbumArtSkeleton = styled(SkeletonBase)`
  width: 232px;
  height: 232px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
`;

const AlbumDetailsSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;

const TrackListSkeleton = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TrackRowSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 56px;
`;

export default function Skeleton({ type = 'home' }) {
    if (type === 'album') {
        return (
            <div style={{ width: '100%' }}>
                <AlbumHeaderSkeleton>
                    <AlbumArtSkeleton />
                    <AlbumDetailsSkeleton>
                        <SkeletonBase style={{ width: '100px', height: '14px' }} />
                        <SkeletonBase style={{ width: '60%', height: '72px' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <SkeletonBase style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                            <SkeletonBase style={{ width: '150px', height: '24px' }} />
                        </div>
                    </AlbumDetailsSkeleton>
                </AlbumHeaderSkeleton>
                <TrackListSkeleton>
                    <TrackRowSkeleton />
                    <TrackRowSkeleton />
                    <TrackRowSkeleton />
                    <TrackRowSkeleton />
                    <TrackRowSkeleton />
                </TrackListSkeleton>
            </div>
        );
    }

    if (type === 'discover') {
        return (
            <div style={{ padding: '40px' }}>
                <SectionHeader />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                    {[...Array(8)].map((_, i) => (
                        <SkeletonBase key={i} style={{ aspectRatio: '1/1', borderRadius: '12px' }} />
                    ))}
                </div>
            </div>
        );
    }

    // Default Home Skeleton
    return (
        <HomeContainer>
            <div>
                <SectionHeader />
                <CardGrid>
                    {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                </CardGrid>
            </div>
            <div>
                <SectionHeader />
                <CardGrid>
                    {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                </CardGrid>
            </div>
        </HomeContainer>
    );
}
