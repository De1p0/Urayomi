import { getSourceList } from "../../core/Sources/SourceLoader"

test('should get source list', async () => {
    const mock = [
        { name: 'mangadex' }
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mock),
    });

    const sourceList = await getSourceList(
        "source Link"
    );

    expect(sourceList.length).toBeGreaterThan(0);
    expect(fetch).toHaveBeenCalledWith(
        "source Link"
    );
});