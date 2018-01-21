module Enumerable

  def stats_sum
    self.inject(0){|accum, i| accum + i }
  end

  def stats_mean
    self.stats_sum/self.length.to_f
  end

  def stats_sample_variance
    m = self.stats_mean
    sum = self.inject(0){|accum, i| accum + (i - m) ** 2 }
    return sum / (self.length - 1).to_f
  end

  def stats_standard_deviation
    return Math.sqrt(self.stats_sample_variance)
  end

end